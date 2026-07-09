// src/car/car.controller.ts
/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseInterceptors,
  UploadedFiles,
  BadRequestException,
} from '@nestjs/common';
import { CarService } from './car.service';
import { Car } from './car.model';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { extname } from 'path';

@Controller('car')
export class CarController {
  constructor(private readonly carService: CarService) {}

  // Define the upload route first to prevent conflicts
  @Post('upload-images')
  @UseInterceptors(
    FilesInterceptor('images', 10, {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix = uuidv4() + extname(file.originalname);
          cb(null, uniqueSuffix);
        },
      }),
    }),
  )
  async uploadImages(@UploadedFiles() files: Express.Multer.File[]) {
    console.log('Uploaded Files:', files);
    if (!files || files.length === 0) {
      throw new BadRequestException('No files uploaded');
    }
    return files.map((file) => file.filename);
  }

  @Post()
  async create(@Body() createCarDto: Partial<Car>): Promise<Car> {
    return this.carService.create(createCarDto);
  }

  @Get()
  async findAll(): Promise<Car[]> {
    return this.carService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Car> {
    return this.carService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCarDto: Partial<Car>,
  ): Promise<Car> {
    return this.carService.update(id, updateCarDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<any> {
    return this.carService.delete(id);
  }

  @Get('compare/:id1/:id2')
  async compare(@Param('id1') id1: string, @Param('id2') id2: string) {
    return this.carService.compareCars(id1, id2);
  }
}
