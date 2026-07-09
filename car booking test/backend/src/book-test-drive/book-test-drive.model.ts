// src/book-test-drive/book-test-drive.model.ts
/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class BookTestDrive extends Document {
  @Prop({ required: true })
  customerName: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true })
  carModel: string;

  @Prop({ required: true })
  preferredDate: Date;

  @Prop({ required: true })
  preferredTimeSlot: string; // e.g., "10:00-12:00"

  @Prop({ default: false })
  isConfirmed: boolean;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const BookTestDriveSchema = SchemaFactory.createForClass(BookTestDrive);
