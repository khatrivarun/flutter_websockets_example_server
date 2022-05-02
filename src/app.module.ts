import { EventsGateway } from './modules/events.gateway';
import { Module } from '@nestjs/common';

@Module({
  imports: [EventsGateway],
})
export class AppModule {}
