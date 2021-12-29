import { Module } from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";

import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import {Event, EventSchema} from './schemas/event.schema';
import {GoogleFilesModule} from "../google-files/google-files.module";


@Module({
  imports: [
      MongooseModule.forFeature([{name: Event.name, schema: EventSchema}]),
      GoogleFilesModule,
  ],
  providers: [EventsService],
  controllers: [EventsController],
})
export class EventsModule {}
