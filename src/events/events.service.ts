import {Injectable} from '@nestjs/common';
import {Model} from 'mongoose';
import {InjectModel} from '@nestjs/mongoose';

import {Event, EventDocument} from './schemas/event.schema';
import {CreateEventDto} from "./dto/create-event.dto";
import {StorageService} from "../storage/storage.service";
import {EventTypesService} from "../event-types/event-types.service";
import {ErrorMessagesService} from "../error-messages/error-messages.service";
import {Image} from "../storage/types";
import {EventType, EventTypeDocument} from "../event-types/schemas/event-type.schema";


@Injectable()
export class EventsService {
    constructor(@InjectModel(Event.name) private eventModel: Model<EventDocument>,
                @InjectModel(EventType.name) private eventTypeModel: Model<EventTypeDocument>,
                private storageService: StorageService,
                private eventTypesService: EventTypesService,
                private errorsService: ErrorMessagesService) {
    }

    async all(): Promise<any> {
        const events = await this.eventModel.find();
        return await Promise.all(events.map(async e => {
            e.type = await this.eventTypeModel.findById(e.type);
            return e;
        }));
    }

    async create(dto: CreateEventDto): Promise<Event> {
        const type = await this.eventTypesService.getTypeByValue(dto.type);

        if (!type) {
            this.errorsService.notFound('event type');
        }

        const images: Image[] = await this.storageService.save(dto.files);
        delete dto.files;

        return this.eventModel.create({...dto, images, type: type._id});
    }

    async delete(id: string): Promise<void> {
        const event = await this.eventModel.findById(id);

        if (!event) {
            this.errorsService.notFound('event');
        }

        const images = event.images.map(i => i.filename);
        await Promise.all([this.storageService.delete(images), event.delete()]);
    }
}
