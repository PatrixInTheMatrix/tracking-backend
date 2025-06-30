import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Query,
  Headers,
  UnauthorizedException
} from '@nestjs/common';
import { TrackingService } from './tracking.service';
import { ConfigService } from '@nestjs/config';

@Controller('tracking')
export class TrackingController {
  constructor(
    private readonly trackingService: TrackingService,
    private readonly configService: ConfigService
  ) {}

  @Post()
  async logEvent(@Body() body: any) {
    return this.trackingService.logEvent(body);
  }

  @Get()
  async getAllEvents(@Query('eventName') eventName?: string) {
    return this.trackingService.getAllEvents(eventName);
  }

  @Get('stats')
  async getStats() {
    return this.trackingService.getEventCounts();
  }

  @Delete()
  async deleteAll(@Headers('x-admin-key') adminKey: string) {
    const expectedKey = this.configService.get<string>('ADMIN_KEY');

    if (!adminKey || adminKey !== expectedKey) {
      throw new UnauthorizedException('Invalid admin key');
    }

    return this.trackingService.deleteAll();
  }
}
