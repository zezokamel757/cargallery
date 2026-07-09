/* eslint-disable prettier/prettier */
/* book-test-drive.module.ts */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BookTestDriveService } from './book-test-drive.service';
import { BookTestDriveController } from './book-test-drive.controller';
import { BookTestDrive, BookTestDriveSchema } from './book-test-drive.model';

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: BookTestDrive.name, schema: BookTestDriveSchema }],
      'cars', // Bind to the "cars" connection
    ),
  ],
  controllers: [BookTestDriveController], // Correctly register the controller
  providers: [BookTestDriveService], // Correctly register the service
})
export class BookTestDriveModule {}
