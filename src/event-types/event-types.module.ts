import {Module} from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";

import {EventTypesService} from './event-types.service';
import {EventTypesController} from './event-types.controller';
import {EventType, EventTypeSchema} from './schemas/event-type.schema';


@Module({
    imports: [MongooseModule.forFeature([{name: EventType.name, schema: EventTypeSchema}])],
    providers: [EventTypesService],
    controllers: [EventTypesController]
})
export class EventTypesModule {
}
