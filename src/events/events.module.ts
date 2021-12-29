import {Module} from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";

import {EventsService} from './events.service';
import {EventsController} from './events.controller';
import {Event, EventSchema} from './schemas/event.schema';
import {StorageModule} from "../storage/storage.module";
import {EventTypesModule} from "../event-types/event-types.module";
import {ErrorMessagesModule} from "../error-messages/error-messages.module";


@Module({
    imports: [
        MongooseModule.forFeature([{name: Event.name, schema: EventSchema}]),
        StorageModule,
        EventTypesModule,
        ErrorMessagesModule,
    ],
    providers: [EventsService],
    controllers: [EventsController],
})
export class EventsModule {
}
