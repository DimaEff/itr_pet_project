import {Body, Controller, Delete, Param, Post, UploadedFiles, UseInterceptors} from '@nestjs/common';

import {CreateEventDto} from "./dto/create-event.dto";
import {FilesInterceptor} from "@nestjs/platform-express";
import {EventsService} from "./events.service";
import {googleStorage} from "../google-files/google-upload-config";
import {GoogleFilesService} from "../google-files/google-files.service";


@Controller('events')
export class EventsController {
    constructor(private eventsService: EventsService,
                private storageService: GoogleFilesService,) {
    }

    @Post()
    @UseInterceptors(FilesInterceptor('files', null, {storage: googleStorage}))
    create(@Body() dto: CreateEventDto, @UploadedFiles() files: any[]) {
        console.log(dto, files);
    }

    // b00f7499-10e9-4599-ba8c-98ffc1c1b8e3.jpg
    @Delete(':fileName')
    delete(@Param('fileName') fileName: string) {
        console.log(fileName);
        this.storageService.delete([fileName]);
    }
}
