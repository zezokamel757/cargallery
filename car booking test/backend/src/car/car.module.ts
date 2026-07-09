// src/car/car.module.ts
/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CarController } from './car.controller';
import { CarService } from './car.service';
import { Car, CarSchema } from './car.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Car.name, schema: CarSchema }], 'cars'),
  ],
  controllers: [CarController],
  providers: [CarService],
})
export class CarModule {}
