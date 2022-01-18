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


@WebSocketGateway(
    {
        namespace: 'events',
        cors: {
            origin: '*',
        },
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

    async handleConnection(client: Socket, ...args: any[]) {
        const cats = await this.eventsService.all();
        client.emit('events.connected', cats);
    }

    handleDisconnect(client: Socket) {
        this.logger.log(`Client disconnected: ${client.id}`);
    }

    @SubscribeMessage('events.create')
    @UseGuards(AuthGuard('jwt-ws'))
    async handleCreate(client: Socket, dto: CreateEventDto) {
        await this.eventsService.create(dto);
        await this.notifyAboutEventsChanges();
    }

    @SubscribeMessage('events.delete')
    @UseGuards(AuthGuard('jwt-ws'))
    async handleDelete(client: Socket, id: string) {
        // console.log(id);
        await this.eventsService.delete(id);
        await this.notifyAboutEventsChanges();
    }

    private async notifyAboutEventsChanges() {
        const events = await this.eventsService.all();
        this.server.emit('events.changed', events);
    }
}