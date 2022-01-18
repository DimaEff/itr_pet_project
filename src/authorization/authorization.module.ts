import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

import { JwtStrategy } from './strategies/jwt.strategy';
import {JwtWSStrategy} from "./strategies/jwt-ws.strategy";
import { AuthorizationService } from './authorization.service';


@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        HttpModule.register({
            timeout: 5000,
            maxRedirects: 5,
        }),
        ConfigModule,
    ],
    providers: [JwtStrategy, JwtWSStrategy, AuthorizationService],
    exports: [PassportModule, AuthorizationService],
})
export class AuthorizationModule {}