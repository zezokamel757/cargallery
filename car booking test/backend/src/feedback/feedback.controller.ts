/* eslint-disable prettier/prettier */
/* feedback.controller.ts */
/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { Feedback } from './feedback.model';

@Controller('feedback')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @Post()
  async createFeedback(@Body() data: Partial<Feedback>): Promise<Feedback> {
    return this.feedbackService.createFeedback(data);
  }

  @Get()
  async getAllFeedback(): Promise<Feedback[]> {
    return this.feedbackService.getAllFeedback();
  }

  @Get(':id')
  async getFeedbackById(@Param('id') id: string): Promise<Feedback> {
    return this.feedbackService.getFeedbackById(id);
  }

  @Put(':id')
  async updateFeedback(
    @Param('id') id: string,
    @Body() updateData: Partial<Feedback>,
  ): Promise<Feedback> {
    return this.feedbackService.updateFeedback(id, updateData);
  }

  @Delete(':id')
  async deleteFeedback(@Param('id') id: string): Promise<void> {
    return this.feedbackService.deleteFeedback(id);
  }
}
