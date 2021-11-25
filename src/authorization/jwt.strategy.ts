import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { passportJwtSecret } from 'jwks-rsa';
import {ConfigService} from '@nestjs/config';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    private AUTH0_AUDIENCE: string;
    private AUTH0_DOMAIN: string;

    constructor(private configService: ConfigService) {
        super({
            secretOrKeyProvider: passportJwtSecret({
                cache: true,
                rateLimit: true,
                jwksRequestsPerMinute: 5,
                jwksUri: `${configService.get<string>('AUTH0_DOMAIN')}.well-known/jwks.json`,
            }),

            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            audience: configService.get<string>('AUTH0_AUDIENCE'),
            issuer: configService.get<string>('AUTH0_DOMAIN'),
            algorithms: ['RS256'],
        });
    }

    validate(payload: any): unknown {
        console.log(payload);
        return payload;
    }
}