import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { AuthorizationModule } from './authorization/authorization.module';
import { HelperModule } from './helper/helper.module';
import { ErrorMessagesModule } from './error-messages/error-messages.module';
import { UsersModule } from './users/users.module';
import { AdminModule } from './admin/admin.module';
import { RolesModule } from './roles/roles.module';
import { ManagementModule } from './management/management.module';
import { EventTypesModule } from './event-types/event-types.module';
import { StorageModule } from './storage/storage.module';
import { EventsModule } from './events/events.module';
import { EventChatModule } from './event-chat/event-chat.module';
import { EventChatGateway } from './event-chat/event-chat.gateway';


@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.${process.env.NODE_ENV}.env`,
            isGlobal: true,
        }),
        MongooseModule.forRoot(process.env.MONGODB_URI),
        CatsModule,
        AuthorizationModule,
        HelperModule,
        ErrorMessagesModule,
        UsersModule,
        AdminModule,
        RolesModule,
        ManagementModule,
        EventTypesModule,
        StorageModule,
        EventsModule,
        EventChatModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
