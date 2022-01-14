import {Injectable} from '@nestjs/common';
import {Model} from 'mongoose';
import {InjectModel} from '@nestjs/mongoose';

import {Event, EventDocument} from './schemas/event.schema';
import {CreateEventDto} from "./dto/create-event.dto";
import {StorageService} from "../storage/storage.service";
import {EventTypesService} from "../event-types/event-types.service";
import {ErrorMessagesService} from "../error-messages/error-messages.service";
import {Image} from "../storage/types";


@Injectable()
export class EventsService {
    constructor(@InjectModel(Event.name) private eventModel: Model<EventDocument>,
                private storageService: StorageService,
                private eventTypesService: EventTypesService,
                private errorsService: ErrorMessagesService) {
    }

    async all(): Promise<Event[]> {
        return this.eventModel.find();
    }

    async create(dto: CreateEventDto, files: any[]): Promise<Event> {
        const images: Image[] = files.map(f => ({filename: f.filename, path: f.path}));
        const type = await this.eventTypesService.getTypeByValue(dto.type);

        if (!type) {
            this.errorsService.notFound('event type');
        }

        return this.eventModel.create({...dto, images, type});
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
