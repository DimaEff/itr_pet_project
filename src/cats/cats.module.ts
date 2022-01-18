import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { Cat, CatSchema } from './schemas/cat.schema';
import {CatsGateway} from "./cats.gateway";
import {AuthorizationModule} from "../authorization/authorization.module";


@Module({
    imports: [
        MongooseModule.forFeature([{ name: Cat.name, schema: CatSchema }]),
        AuthorizationModule,
    ],
    controllers: [CatsController],
    providers: [CatsService],
})
export class CatsModule {
}
