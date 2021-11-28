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
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
