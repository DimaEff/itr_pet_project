import {Module} from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";

import {EventTypesService} from './event-types.service';
import {EventTypesController} from './event-types.controller';
import {EventType, EventTypeSchema} from './schemas/event-type.schema';
import {HelperModule} from "../helper/helper.module";
import {ErrorMessagesModule} from "../error-messages/error-messages.module";


@Module({
    imports: [
        MongooseModule.forFeature([{name: EventType.name, schema: EventTypeSchema}]),
        HelperModule,
        ErrorMessagesModule,
    ],
    providers: [EventTypesService],
    controllers: [EventTypesController],
    exports: [EventTypesService],
})
export class EventTypesModule {
}
