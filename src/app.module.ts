import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { AuthorizationModule } from './authorization/authorization.module';


@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.${process.env.NODE_ENV}.env`,
            isGlobal: true,
        }),
        MongooseModule.forRoot(process.env.MONGODB_URI),
        CatsModule,
        AuthorizationModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
