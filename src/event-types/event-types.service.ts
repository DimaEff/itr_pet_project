import {Injectable} from '@nestjs/common';
import {Model} from "mongoose";
import {InjectModel} from "@nestjs/mongoose";

import {CreateEventTypeDto} from "./dto/create-event-type.dto";
import {EventType, EventTypeDocument} from "./schemas/event-type.schema";
import {HelperService} from "../helper/helper.service";
import {ErrorMessagesService} from "../error-messages/error-messages.service";
import {Image} from "../storage/types";


@Injectable()
export class EventTypesService {
    constructor(@InjectModel(EventType.name) private eventTypeModel: Model<EventTypeDocument>,
                private helperService: HelperService,
                private errorsService: ErrorMessagesService) {
    }

    async getAllTypes(): Promise<EventType[]> {
        return this.eventTypeModel.find();
    }

    async create(dto: CreateEventTypeDto, file: any): Promise<EventType> {
        const normalizedDto = this.helperService.normalizeDtoProps(dto, ['value']);

        const type = await this.getTypeByValue(normalizedDto.value);
        if (type) {
            this.errorsService.isExist('event type');
        }

        console.log('event type', file);
        const icon: Image = {filename: file.filename, path: file.path};
        return this.eventTypeModel.create({...normalizedDto, icon});
    }

    async getTypeByValue(value: string) {
        return this.eventTypeModel.findOne({value: value.toLowerCase()});
    }

    async delete(id: string): Promise<void> {
        await this.eventTypeModel.findOneAndDelete({id});
    }
}
