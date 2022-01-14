import {
    OnGatewayConnection,
    OnGatewayDisconnect,
    OnGatewayInit,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';
import {Logger, UploadedFiles, UseInterceptors} from '@nestjs/common';
import {Server, Socket} from 'socket.io';
import {FilesInterceptor} from "@nestjs/platform-express";

import {EventsService} from './events.service';
import {CreateEventDto} from './dto/create-event.dto';
import {googleStorage} from "../storage/storage-config";


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
        client.emit('catsConnect', cats);
    }

    handleDisconnect(client: Socket) {
        this.logger.log(`Client disconnected: ${client.id}`);
    }

    @SubscribeMessage('createEvent')
    @UseInterceptors(FilesInterceptor('files', null, {storage: googleStorage}))
    async handleMessage(client: Socket, dto: CreateEventDto, @UploadedFiles() files: any[]): Promise<void> {
        this.logger.log('Message: ' + dto);
        // await this.eventsService.create(dto, files);
        // const cats = await this.eventsService.all();
        // this.server.emit('eventCreated', cats);
    }
}