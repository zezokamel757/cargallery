// src/car/car.service.ts (Handle image URLs)
/* eslint-disable prettier/prettier */
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Car } from './car.model';

@Injectable()
export class CarService {
  constructor(
    @InjectModel(Car.name, 'cars') private readonly carModel: Model<Car>,
  ) {}

  async create(car: Partial<Car>): Promise<Car> {
    const newCar = new this.carModel(car);
    return await newCar.save();
  }

  async findAll(): Promise<Car[]> {
    return await this.carModel.find().exec();
  }

  async findOne(id: string): Promise<Car> {
    return await this.carModel.findById(id).exec();
  }

  async update(id: string, car: Partial<Car>): Promise<Car> {
    return await this.carModel.findByIdAndUpdate(id, car, { new: true }).exec();
  }

  async delete(id: string): Promise<any> {
    return await this.carModel.deleteOne({ _id: id }).exec();
  }

  async compareCars(
    id1: string,
    id2: string,
  ): Promise<{ car1: Car; car2: Car }> {
    const car1 = await this.carModel.findById(id1).exec();
    const car2 = await this.carModel.findById(id2).exec();
    if (!car1 || !car2) {
      throw new BadRequestException('One or both cars not found');
    }
    return { car1, car2 };
  }
}
