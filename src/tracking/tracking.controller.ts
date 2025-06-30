import { Controller, Get, Post, Body } from '@nestjs/common';
import { TrackingService } from './tracking.service';

@Controller('tracking')
export class TrackingController {
  constructor(private readonly trackingService: TrackingService) {}

  @Post()
  async logEvent(@Body() body: any) {
    return this.trackingService.logEvent(body);
  }

  @Get()
  async getAllEvents() {
    return this.trackingService.getAllEvents();
  }
}
