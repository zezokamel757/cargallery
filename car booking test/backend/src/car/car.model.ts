// src/car/car.model.ts
/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Car extends Document {
  @Prop({ required: true })
  make: string;

  @Prop({ required: true })
  carModel: string;

  @Prop({ required: true })
  year: number;

  @Prop({ required: true })
  price: number;

  @Prop({ required: false })
  color?: string;

  @Prop({ required: false })
  mileage?: number;

  @Prop({ required: false })
  fuelType?: string;

  @Prop({ required: false })
  transmission?: string;

  @Prop({ required: false })
  engine?: string;

  @Prop({ required: false })
  description?: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ required: false })
  images: string[]; // Array of image URLs
}

export const CarSchema = SchemaFactory.createForClass(Car);
