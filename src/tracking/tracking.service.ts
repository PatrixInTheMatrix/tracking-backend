import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class TrackingService {
  constructor(@InjectModel('TrackingEvent') private model: Model<any>) { }

  // Neues Tracking-Event speichern
  async logEvent(payload: any): Promise<any> {
    return this.model.create(payload);
  }

  // Alle Events abrufen (neueste zuerst)
  async getAllEvents(): Promise<any[]> {
    return this.model.find().sort({ timestamp: -1 }).exec();
  }

  // Alle Events löschen (Reset-Funktion)
  async deleteAll(): Promise<any> {
    return this.model.deleteMany({});
  }

  async getAllEvents(eventName?: string): Promise<any[]> {
    const filter = eventName ? { eventName } : {};
    return this.model.find(filter).sort({ timestamp: -1 }).exec();
  }

  async getEventCounts(): Promise<any[]> {
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
