import {Injectable} from '@nestjs/common';
import {Model} from 'mongoose';
import {InjectModel} from '@nestjs/mongoose';

import {Event, EventDocument} from './schemas/event.schema';
import {CreateEventDto} from "./dto/create-event.dto";
import {StorageService} from "../storage/storage.service";
import {EventTypesService} from "../event-types/event-types.service";
import {ErrorMessagesService} from "../error-messages/error-messages.service";


@Injectable()
export class EventsService {
    constructor(@InjectModel(Event.name) private eventModel: Model<EventDocument>,
                private googleService: StorageService,
                private eventTypesService: EventTypesService,
                private errorsService: ErrorMessagesService) {
    }

    async create(dto: CreateEventDto, files: any[]): Promise<Event> {
        const images = files.map(f => ({filename: f.filename, path: f.path}));
        const type = await this.eventTypesService.getTypeByValue(dto.type);
        if (!type) {
            this.errorsService.notFound('event type');
        }
        console.log({...dto, images, type});
        return this.eventModel.create({...dto, images, type});
    }
}
