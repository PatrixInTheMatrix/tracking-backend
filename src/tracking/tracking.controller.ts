import { Controller, Get, Post, Delete, Body } from '@nestjs/common';
import { TrackingService } from './tracking.service';

@Controller('tracking')
export class TrackingController {
  constructor(private readonly trackingService: TrackingService) {}

  // Neuen Tracking-Event speichern
  @Post()
  async logEvent(@Body() body: any) {
    return this.trackingService.logEvent(body);
  }

  // Alle Events abrufen
  @Get()
  async getAllEvents() {
    return this.trackingService.getAllEvents();
  }

  // Alle Events löschen (Reset)
  @Delete()
  async deleteAll() {
    return this.trackingService.deleteAll();
  }
}
