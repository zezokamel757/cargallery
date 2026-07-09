// src/book-test-drive/book-test-drive.service.ts
/* eslint-disable prettier/prettier */
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BookTestDrive } from './book-test-drive.model';

@Injectable()
export class BookTestDriveService {
  private readonly MIN_BOOKING_DURATION = 30; // 30 minutes
  private readonly MAX_BOOKING_DURATION = 120; // 2 hours
  private readonly BUSINESS_HOURS = {
    start: '09:00',
    end: '17:00',
  };

  constructor(
    @InjectModel(BookTestDrive.name, 'cars')
    private readonly bookTestDriveModel: Model<BookTestDrive>,
  ) {}

  // Helper function to check if two time slots overlap
  private doTimeSlotsOverlap(slot1: string, slot2: string): boolean {
    const [start1, end1] = slot1.split('-').map(time => new Date(`2000-01-01T${time.trim()}`));
    const [start2, end2] = slot2.split('-').map(time => new Date(`2000-01-01T${time.trim()}`));
    
    return (start1 < end2 && end1 > start2);
  }

  // Helper function to validate booking duration
  private validateBookingDuration(timeSlot: string): void {
    const [start, end] = timeSlot.split('-').map(time => new Date(`2000-01-01T${time.trim()}`));
    const durationInMinutes = (end.getTime() - start.getTime()) / (1000 * 60);

    if (durationInMinutes < this.MIN_BOOKING_DURATION) {
      throw new BadRequestException(
        `Booking duration must be at least ${this.MIN_BOOKING_DURATION} minutes.`,
      );
    }

    if (durationInMinutes > this.MAX_BOOKING_DURATION) {
      throw new BadRequestException(
        `Booking duration cannot exceed ${this.MAX_BOOKING_DURATION} minutes.`,
      );
    }
  }

  // Helper function to validate business hours
  private validateBusinessHours(timeSlot: string): void {
    const [start, end] = timeSlot.split('-').map(time => time.trim());
    const businessStart = this.BUSINESS_HOURS.start;
    const businessEnd = this.BUSINESS_HOURS.end;

    if (start < businessStart || end > businessEnd) {
      throw new BadRequestException(
        `Bookings are only available between ${businessStart} and ${businessEnd}.`,
      );
    }
  }

  // Helper function to check for overlapping bookings
  private async hasOverlappingBooking(
    carModel: string,
    date: Date,
    timeSlot: string,
    excludeBookingId?: string,
  ): Promise<boolean> {
    const query: any = {
      carModel,
      preferredDate: {
        $gte: new Date(date.setHours(0, 0, 0, 0)),
        $lt: new Date(date.setHours(23, 59, 59, 999)),
      },
    };

    if (excludeBookingId) {
      query._id = { $ne: excludeBookingId };
    }

    const existingBookings = await this.bookTestDriveModel.find(query).exec();
    
    return existingBookings.some(booking => 
      this.doTimeSlotsOverlap(booking.preferredTimeSlot, timeSlot)
    );
  }

  // Get available time slots for a specific car and date
  async getAvailableTimeSlots(carModel: string, date: Date): Promise<string[]> {
    // Get all bookings for the car on the specified date
    const existingBookings = await this.bookTestDriveModel.find({
      carModel,
      preferredDate: {
        $gte: new Date(date.setHours(0, 0, 0, 0)),
        $lt: new Date(date.setHours(23, 59, 59, 999)),
      },
    }).exec();

    // Generate all possible 30-minute slots within business hours
    const allSlots: string[] = [];
    const [businessStart, businessEnd] = [
      this.BUSINESS_HOURS.start,
      this.BUSINESS_HOURS.end,
    ].map(time => new Date(`2000-01-01T${time}`));

    let currentTime = new Date(businessStart);
    while (currentTime < businessEnd) {
      const slotEnd = new Date(currentTime.getTime() + this.MIN_BOOKING_DURATION * 60000);
      if (slotEnd <= businessEnd) {
        allSlots.push(
          `${currentTime.toTimeString().slice(0, 5)}-${slotEnd.toTimeString().slice(0, 5)}`,
        );
      }
      currentTime = new Date(currentTime.getTime() + 30 * 60000); // Move forward 30 minutes
    }

    // Filter out slots that overlap with existing bookings
    return allSlots.filter(slot => 
      !existingBookings.some(booking => this.doTimeSlotsOverlap(booking.preferredTimeSlot, slot))
    );
  }

  // Create a new test drive booking
  async createBooking(data: Partial<BookTestDrive>): Promise<BookTestDrive> {
    // Validate booking duration
    this.validateBookingDuration(data.preferredTimeSlot);
    
    // Validate business hours
    this.validateBusinessHours(data.preferredTimeSlot);

    // Ensure preferredDate is a Date object
    const preferredDate = new Date(data.preferredDate);
    if (isNaN(preferredDate.getTime())) {
      throw new BadRequestException('Invalid date format');
    }

    // Check for overlapping bookings
    const hasOverlap = await this.hasOverlappingBooking(
      data.carModel,
      preferredDate,
      data.preferredTimeSlot,
    );

    if (hasOverlap) {
      throw new BadRequestException(
        'This time slot overlaps with an existing booking. Please choose another time slot.',
      );
    }

    // Update the data with the parsed date
    const bookingData = {
      ...data,
      preferredDate,
    };

    const booking = new this.bookTestDriveModel(bookingData);
    return booking.save();
  }

  // Get all bookings
  async getAllBookings(): Promise<BookTestDrive[]> {
    return this.bookTestDriveModel.find().exec();
  }

  // Get a single booking by ID
  async getBookingById(id: string): Promise<BookTestDrive> {
    return this.bookTestDriveModel.findById(id).exec();
  }

  // Update a booking
  async updateBooking(
    id: string,
    updateData: Partial<BookTestDrive>,
  ): Promise<BookTestDrive> {
    // If updating time slot, validate and check for overlaps
    if (updateData.preferredTimeSlot) {
      this.validateBookingDuration(updateData.preferredTimeSlot);
      this.validateBusinessHours(updateData.preferredTimeSlot);

      if (updateData.preferredDate) {
        const hasOverlap = await this.hasOverlappingBooking(
          updateData.carModel,
          updateData.preferredDate,
          updateData.preferredTimeSlot,
          id,
        );

        if (hasOverlap) {
          throw new BadRequestException(
            'This time slot overlaps with an existing booking. Please choose another time slot.',
          );
        }
      }
    }

    return this.bookTestDriveModel
      .findByIdAndUpdate(id, updateData, {
        new: true,
      })
      .exec();
  }

  // Delete a booking
  async deleteBooking(id: string): Promise<void> {
    await this.bookTestDriveModel.findByIdAndDelete(id).exec();
  }
}