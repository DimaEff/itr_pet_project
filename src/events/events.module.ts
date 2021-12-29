import { Module } from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";

import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import {Event, EventSchema} from './schemas/event.schema';
import {StorageModule} from "../storage/storage.module";


@Module({
  imports: [
      MongooseModule.forFeature([{name: Event.name, schema: EventSchema}]),
      StorageModule,
  ],
  providers: [EventsService],
  controllers: [EventsController],
})
export class EventsModule {}
