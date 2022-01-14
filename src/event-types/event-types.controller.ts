import {Body, Controller, Delete, Get, Param, Post, UploadedFile, UseInterceptors} from '@nestjs/common';
import {FileInterceptor} from "@nestjs/platform-express";

import {EventTypesService} from './event-types.service';
import {CreateEventTypeDto} from "./dto/create-event-type.dto";
import {googleStorage} from "../storage/storage-config";


@Controller('event-types')
export class EventTypesController {
    constructor(private eventTypeService: EventTypesService) {
    }

    @Get()
    all() {
        return this.eventTypeService.getAllTypes();
    }

    @Post()
    @UseInterceptors(FileInterceptor('file', {storage: googleStorage}))
    create(@Body() dto: CreateEventTypeDto, @UploadedFile() file) {
        return this.eventTypeService.create(dto, file);
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.eventTypeService.delete(id);
    }
}
