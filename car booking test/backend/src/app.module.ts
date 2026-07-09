// src/app.module.ts
/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { BookTestDriveModule } from './book-test-drive/book-test-drive.module';
import { FeedbackModule } from './feedback/feedback.module';
import { CarModule } from './car/car.module';
import * as dotenv from 'dotenv';
import { ConfigModule } from '@nestjs/config';

dotenv.config();

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // Centralize database connections
    MongooseModule.forRoot(process.env.DB, { connectionName: 'default' }),
    MongooseModule.forRoot(process.env.CARS_DB, { connectionName: 'cars' }),
    // Import modules as components
    UserModule,
    BookTestDriveModule,
    FeedbackModule,
    CarModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
