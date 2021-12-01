import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { ManagementModule } from '../management/management.module';


@Module({
    imports: [
        HttpModule.register({
            timeout: 5000,
            maxRedirects: 5,
        }),
        ManagementModule,
    ],
    controllers: [UsersController],
    providers: [UsersService],
    exports: [UsersService],
})
export class UsersModule {
}
