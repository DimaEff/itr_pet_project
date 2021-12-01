import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

import { JwtStrategy } from './strategies/jwt.strategy';


@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        HttpModule.register({
            timeout: 5000,
            maxRedirects: 5,
        }),
        ConfigModule,
    ],
    providers: [JwtStrategy],
    exports: [PassportModule],
})
export class AuthorizationModule {}