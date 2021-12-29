import {Body, Controller, Post, UploadedFile, UseInterceptors} from '@nestjs/common';
import {FileInterceptor} from "@nestjs/platform-express";

import {EventTypesService} from './event-types.service';
import {CreateEventTypeDto} from "./dto/create-event-type.dto";
import {googleStorage} from "../storage/storage-config";


@Controller('event-types')
export class EventTypesController {
    constructor(private eventTypeService: EventTypesService) {
    }

    @Post()
    @UseInterceptors(FileInterceptor('file', {storage: googleStorage}))
    create(@Body() dto: CreateEventTypeDto, @UploadedFile() file) {
        return this.eventTypeService.create(dto, file);
    }
}
