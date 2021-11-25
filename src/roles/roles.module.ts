import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { Role, RoleSchema } from './schemas/role.schema';
import { HelperModule } from '../helper/helper.module';
import { ErrorMessagesModule } from '../error-messages/error-messages.module';


@Module({
    imports: [
        MongooseModule.forFeature([{ name: Role.name, schema: RoleSchema }]),
        HelperModule,
        ErrorMessagesModule,
    ],
    controllers: [RolesController],
    providers: [RolesService],
})
export class RolesModule {
}
