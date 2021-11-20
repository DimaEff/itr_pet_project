import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';


@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.${process.env.NODE_ENV}.env`,
        }),
        MongooseModule.forRoot(process.env.MONGODB_URI),
        CatsModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
