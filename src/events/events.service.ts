import { Injectable } from '@nestjs/common';

import {CreateEventDto} from "./dto/create-event.dto";
import {GoogleFilesService} from "../google-files/google-files.service";


@Injectable()
export class EventsService {
    constructor(private readonly googleService: GoogleFilesService) {
    }
}
