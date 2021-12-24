import {Controller, Post, UploadedFile, UseInterceptors} from '@nestjs/common';
import {FileInterceptor} from "@nestjs/platform-express";

import {googleStorage} from "../google-files/google-upload-config";
import {MulterOptions} from "@nestjs/platform-express/multer/interfaces/multer-options.interface";


@Controller('events')
export class EventsController {

    @Post()
    @UseInterceptors(FileInterceptor('file', {storage: googleStorage}))
    uploadImage(@UploadedFile() file: MulterOptions) {
        return 'successful!';
    }
}
