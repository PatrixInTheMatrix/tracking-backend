import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class TrackingService {
  constructor(@InjectModel('TrackingEvent') private model: Model<any>) {}

  async logEvent(payload: any): Promise<any> {
    return this.model.create(payload);
  }

  async getAllEvents(eventName?: string): Promise<any[]> {
    const filter = eventName ? { eventName } : {};
    return this.model.find(filter).sort({ timestamp: -1 }).exec();
  }

  async deleteAll(): Promise<any> {
    return this.model.deleteMany({});
  }

  async getEventCounts(): Promise<{ _id: string; count: number }[]> {
    return this.model.aggregate([
      {
        $group: {
          _id: '$data.feature',
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } }
    ]);
  }
}
