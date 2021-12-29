import { Injectable } from '@nestjs/common';

import {CreateEventDto} from "./dto/create-event.dto";
import {StorageService} from "../storage/storage.service";


@Injectable()
export class EventsService {
    constructor(private readonly googleService: StorageService) {
    }
}
