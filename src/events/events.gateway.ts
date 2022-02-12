import {
    OnGatewayConnection,
    OnGatewayDisconnect,
    OnGatewayInit,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';
import {Logger, UseGuards} from '@nestjs/common';
import {Server, Socket} from 'socket.io';
import {AuthGuard} from "@nestjs/passport";

import {EventsService} from './events.service';
import {CreateEventDto} from './dto/create-event.dto';
import {getSubscribeMessageCreator} from "../helper/utils";
import {LikeOrReportDto} from "./dto/like-or-report.dto";


const SOCKET_NAME = 'events';
const getSubscribeMessage = getSubscribeMessageCreator(SOCKET_NAME);

@WebSocketGateway(
    {
        namespace: SOCKET_NAME,
        cors: true,
    }
)
export class EventsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    constructor(private eventsService: EventsService) {
    }

    @WebSocketServer()
    server: Server;

    private logger: Logger = new Logger('Events');

    afterInit(server: Server) {
        this.logger.log('Init');
    }

    async handleConnection(client: Socket) {
        this.logger.log(`Client connected: ${client.id}`);
    }

    handleDisconnect(client: Socket) {
        this.logger.log(`Client disconnected: ${client.id}`);
    }

    @SubscribeMessage(getSubscribeMessage('connect'))
    async handleConnect(client: Socket) {
        const events = await this.eventsService.all();
        client.emit(getSubscribeMessage('connected'), events);
    }

    @SubscribeMessage(getSubscribeMessage('create'))
    @UseGuards(AuthGuard('jwt-ws'))
    async handleCreate(client: Socket, dto: CreateEventDto) {
        await this.eventsService.create(dto);
        await this.notifyAllAboutEventsChanges();
    }

    @SubscribeMessage(getSubscribeMessage('delete'))
    @UseGuards(AuthGuard('jwt-ws'))
    async handleDelete(client: Socket, id: string) {
        await this.eventsService.delete(id);
        await this.notifyAllAboutEventsChanges();
    }

    @SubscribeMessage(getSubscribeMessage('like'))
    @UseGuards(AuthGuard('jwt-ws'))
    async like(client: Socket, dto: LikeOrReportDto) {
        await this.eventsService.like(dto);
        await this.notifyOnlyClientAboutEventsChanges(client);
    }

    @SubscribeMessage(getSubscribeMessage('unlike'))
    @UseGuards(AuthGuard('jwt-ws'))
    async unlike(client: Socket, dto: LikeOrReportDto) {
        await this.eventsService.unlike(dto);
        await this.notifyOnlyClientAboutEventsChanges(client);
    }

    @SubscribeMessage(getSubscribeMessage('report'))
    @UseGuards(AuthGuard('jwt-ws'))
    async report(client: Socket, dto: LikeOrReportDto) {
        const isDelete = await this.eventsService.report(dto);

        if (isDelete) {
            await this.notifyAllAboutEventsChanges();
        } else {
            await this.notifyOnlyClientAboutEventsChanges(client);
        }
    }

    private async notifyAllAboutEventsChanges() {
        const events = await this.eventsService.all();
        this.server.emit(getSubscribeMessage('changed'), events);
    }

    private async notifyOnlyClientAboutEventsChanges(client: Socket) {
        const events = await this.eventsService.all();
        client.emit(getSubscribeMessage('changed'), events);
    }
}