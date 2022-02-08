import {
    OnGatewayConnection,
    OnGatewayDisconnect,
    OnGatewayInit,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer
} from '@nestjs/websockets';
import {Logger} from "@nestjs/common";
import {Socket} from "socket.io";

import {Message} from "./schemas/message.schema";
import {EventChatService} from "./event-chat.service";
import {CreateMessageDto} from "./dto/create-message.dto";
import {getSubscribeMessageCreator} from "../helper/utils";


const socketName = 'events-chat';
const getSubscribeMessage = getSubscribeMessageCreator(socketName);

@WebSocketGateway(
    {
        namespace: socketName,
        cors: true,
    }
)
export class EventChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    constructor(private eventChatService: EventChatService) {
    }

    @WebSocketServer()
    server: Socket;

    private logger: Logger = new Logger('Events-chat');

    afterInit(server: Socket) {
        this.logger.log('Init');
    }

    async handleConnection(client: Socket) {
        this.logger.log(`Client connected: ${client.id}`);
    }

    handleDisconnect(client: Socket) {
        client.disconnect();
        this.logger.log(`Client disconnected: ${client.id}`);
    }

    @SubscribeMessage(getSubscribeMessage('connect'))
    async handleJoin(client: Socket, eventId) {
        console.log('join', eventId);
        client.join(eventId);
        this.logger.log(`Client ${client.id} joined to room ${eventId}.`);

        const messages: Message[] = await this.eventChatService.getAll(eventId);

        client.emit(getSubscribeMessage('connected'), messages);
    }

    @SubscribeMessage(getSubscribeMessage('message'))
    async handleMessage(client: Socket, dto: CreateMessageDto) {
        await this.eventChatService.create(dto);
        const messages: Message[] = await this.eventChatService.getAll(dto.eid);

        this.server.to(dto.eid).emit(getSubscribeMessage('changed'), messages);
    }
}