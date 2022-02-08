import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";

import {Message, MessageDocument} from "./schemas/message.schema";
import {CreateMessageDto} from "./dto/create-message.dto";


@Injectable()
export class EventChatService {
    constructor(@InjectModel(Message.name) private messageModel: Model<MessageDocument>) {
    }

    async getAll(eventId: string): Promise<Message[]> {
        return this.messageModel.find({eid: eventId}).sort({createdAt: -1});
    }

    async create(dto: CreateMessageDto): Promise<Message> {
        return this.messageModel.create(dto);
    }
}
