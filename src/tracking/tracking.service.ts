import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class TrackingService {
  constructor(@InjectModel('TrackingEvent') private model: Model<any>) {}

  async logEvent(payload: any): Promise<any> {
    return this.model.create(payload);
  }
}
