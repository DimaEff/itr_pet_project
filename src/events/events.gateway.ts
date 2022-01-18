import {
    OnGatewayConnection,
    OnGatewayDisconnect,
    OnGatewayInit,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';
import {Logger, UploadedFiles, UseGuards, UseInterceptors} from '@nestjs/common';
import {Server, Socket} from 'socket.io';
import {FilesInterceptor} from "@nestjs/platform-express";

import {EventsService} from './events.service';
import {CreateEventDto} from './dto/create-event.dto';
import {googleStorage} from "../storage/storage-config";
import {StorageService} from "../storage/storage.service";
import {AuthGuard} from "@nestjs/passport";


@WebSocketGateway(
    {
        namespace: 'events',
        cors: {
            origin: '*',
        },
    }
)
export class EventsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    constructor(private eventsService: EventsService,
                private storageService: StorageService) {
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
    // @UseInterceptors(FilesInterceptor('files', null, {storage: googleStorage}))
    async handleCreate(client: Socket, dto: any): Promise<void> {
        // this.logger.log(dto);
        const images = await this.storageService.save(dto.files);
        console.log(images)
        // await this.eventsService.create(dto, files);
        // const cats = await this.eventsService.all();
        this.server.emit('events.created', []);
    }
}