// src/feedback/feedback.service.ts (Updated to link feedback after booking)
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Feedback } from './feedback.model';

@Injectable()
export class FeedbackService {
  constructor(
    @InjectModel(Feedback.name, 'cars')
    private readonly feedbackModel: Model<Feedback>,
  ) {}

  async createFeedback(data: Partial<Feedback>): Promise<Feedback> {
    const feedback = new this.feedbackModel(data);
    return feedback.save();
  }

  async getAllFeedback(): Promise<Feedback[]> {
    return this.feedbackModel.find().exec();
  }

  async getFeedbackById(id: string): Promise<Feedback> {
    return this.feedbackModel.findById(id).exec();
  }

  async updateFeedback(
    id: string,
    updateData: Partial<Feedback>,
  ): Promise<Feedback> {
    return this.feedbackModel
      .findByIdAndUpdate(id, updateData, {
        new: true,
      })
      .exec();
  }

  async deleteFeedback(id: string): Promise<void> {
    await this.feedbackModel.findByIdAndDelete(id).exec();
  }
}
