import {Module} from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";

import {EventChatService} from './event-chat.service';
import {Message, MessageSchema} from "./schemas/message.schema";
import {EventChatGateway} from "./event-chat.gateway";


@Module({
    imports: [
        MongooseModule.forFeature([{name: Message.name, schema: MessageSchema}]),
    ],
    providers: [EventChatService, EventChatGateway],
})
export class EventChatModule {
}
