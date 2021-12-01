import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { RolesService } from './roles.service';
import { ManagementModule } from '../management/management.module';


@Module({
    imports: [
        HttpModule.register({
            timeout: 5000,
            maxRedirects: 5,
        }),
        ManagementModule,
    ],
    providers: [RolesService],
    exports: [RolesService],
})
export class RolesModule {
}
