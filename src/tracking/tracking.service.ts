import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class TrackingService {
  constructor(@InjectModel('TrackingEvent') private model: Model<any>) { }

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

  async getSessionPageCounts(): Promise<any[]> {
    return this.model.aggregate([
      { $match: { eventName: 'pageview' } },
      {
        $group: {
          _id: '$sessionId',
          pages: { $addToSet: '$data.page' }
        }
      },
      {
        $project: {
          _id: 1,
          pageCount: { $size: '$pages' }
        }
      },
      { $sort: { pageCount: -1 } }
    ]);
  }

  async getTimelineGroupedBySession(period: 'day' | 'week' | 'month' | 'year') {
    const dateFormatMap: Record<string, string> = {
      day: '%Y-%m-%d',
      week: '%Y-%U', // Kalenderwoche (Achtung: Sonntag-basierte Wochenzählung)
      month: '%Y-%m',
      year: '%Y'
    };

    const format = dateFormatMap[period] || '%Y-%m-%d';

    return this.model.aggregate([
      {
        $project: {
          sessionId: 1,
          date: { $dateToString: { format, date: '$timestamp' } }
        }
      },
      {
        $group: {
          _id: '$date',
          uniqueSessions: { $addToSet: '$sessionId' }
        }
      },
      {
        $project: {
          _id: 1,
          sessionCount: { $size: '$uniqueSessions' }
        }
      },
      { $sort: { _id: 1 } }
    ]);
  }
  
}
