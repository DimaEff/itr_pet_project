import {
    OnGatewayConnection,
    OnGatewayDisconnect,
    OnGatewayInit,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';
import {Logger} from '@nestjs/common';
import {Server, Socket} from 'socket.io';
import {CatsService} from "./cats.service";
import {CreateCatDto} from "./dto/create-cat.dto";


@WebSocketGateway(
    {
        namespace: 'cats',
        cors: {
            origin: '*',
        },
    }
)
export class CatsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    constructor(private catService: CatsService) {
    }

    @WebSocketServer()
    server: Server;

    private logger: Logger = new Logger('Cats');

    afterInit(server: Server) {
        this.logger.log('Init');
    }

    @SubscribeMessage('addCat')
    async handleMessage(client: Socket, dto: CreateCatDto): Promise<void> {
        this.logger.log('Message: ' + dto);
        await this.catService.create(dto);
        const cats = await this.catService.findAll();
        this.server.emit('catAdded', cats);
    }

    handleDisconnect(client: Socket) {
        this.logger.log(`Client disconnected: ${client.id}`);
    }

    async handleConnection(client: Socket, ...args: any[]) {
        this.logger.log(`Client connected: ${client.id}`);
        const cats = await this.catService.findAll();
        client.emit('catsConnect', cats);
    }
}