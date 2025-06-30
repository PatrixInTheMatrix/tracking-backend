import { Controller, Post, Body } from '@nestjs/common';
import { TrackingService } from './tracking.service';

@Controller('tracking')
export class TrackingController {
  constructor(private readonly trackingService: TrackingService) {}

  @Post()
  async track(@Body() body: any) {
    return this.trackingService.logEvent(body);
  }
}
