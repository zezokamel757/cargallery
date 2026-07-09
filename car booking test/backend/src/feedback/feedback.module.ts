/* eslint-disable prettier/prettier */
/* feedback.module.ts */
/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FeedbackController } from './feedback.controller';
import { FeedbackService } from './feedback.service';
import { Feedback, FeedbackSchema } from './feedback.model';

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: Feedback.name, schema: FeedbackSchema }],
      'cars', // Use the 'cars' database connection
    ),
  ],
  controllers: [FeedbackController],
  providers: [FeedbackService],
})
export class FeedbackModule {}
