// src/book-test-drive/book-test-drive.controller.ts
/* eslint-disable prettier/prettier */
import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Put,
  Delete,
  Query,
  PipeTransform,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { BookTestDriveService } from './book-test-drive.service';
import { BookTestDrive } from './book-test-drive.model';

// Custom pipe to parse date
class ParseDatePipe implements PipeTransform<string, Date> {
  transform(value: string, metadata: ArgumentMetadata): Date {
    const date = new Date(value);
    if (isNaN(date.getTime())) {
      throw new BadRequestException('Invalid date format');
    }
    return date;
  }
}

@Controller('book-test-drive')
export class BookTestDriveController {
  constructor(private readonly bookTestDriveService: BookTestDriveService) {}

  // Get available time slots
  @Get('available-slots')
  async getAvailableTimeSlots(
    @Query('carModel') carModel: string,
    @Query('date', ParseDatePipe) date: Date,
  ) {
    return this.bookTestDriveService.getAvailableTimeSlots(carModel, date);
  }

  // Create a new booking
  @Post()
  async createBooking(
    @Body() data: Partial<BookTestDrive>,
  ): Promise<BookTestDrive> {
    return this.bookTestDriveService.createBooking(data);
  }

  // Get all bookings
  @Get()
  async getAllBookings(): Promise<BookTestDrive[]> {
    return this.bookTestDriveService.getAllBookings();
  }

  // Get a single booking by ID
  @Get(':id')
  async getBookingById(@Param('id') id: string): Promise<BookTestDrive> {
    return this.bookTestDriveService.getBookingById(id);
  }

  // Update a booking
  @Put(':id')
  async updateBooking(
    @Param('id') id: string,
    @Body() updateData: Partial<BookTestDrive>,
  ): Promise<BookTestDrive> {
    return this.bookTestDriveService.updateBooking(id, updateData);
  }

  // Delete a booking
  @Delete(':id')
  async deleteBooking(@Param('id') id: string): Promise<void> {
    return this.bookTestDriveService.deleteBooking(id);
  }
}
