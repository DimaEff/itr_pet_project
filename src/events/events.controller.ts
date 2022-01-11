import {Body, Controller, Delete, Get, Param, Post, UploadedFiles, UseGuards, UseInterceptors} from '@nestjs/common';
import {FilesInterceptor} from "@nestjs/platform-express";
import {AuthGuard} from "@nestjs/passport";

import {CreateEventDto} from "./dto/create-event.dto";
import {EventsService} from "./events.service";
import {googleStorage} from "../storage/storage-config";


@Controller('events')
export class EventsController {
    constructor(private eventsService: EventsService) {
    }

    @Get()
    all() {
        return this.eventsService.all();
    }

    @Post()
    @UseGuards(AuthGuard('jwt'))
    @UseInterceptors(FilesInterceptor('files', null, {storage: googleStorage}))
    create(@Body() dto: CreateEventDto, @UploadedFiles() files: any[]) {
        return this.eventsService.create(dto, files);
    }

    @Delete(':id')
    @UseGuards(AuthGuard('jwt'))
    delete(@Param('id') id: string) {
        return this.eventsService.delete(id);
    }
}
