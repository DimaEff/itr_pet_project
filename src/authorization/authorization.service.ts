import { Injectable } from '@nestjs/common';
import {passportJwtSecret} from "jwks-rsa";
import {ConfigService} from "@nestjs/config";

@Injectable()
export class AuthorizationService {
    constructor(private configService: ConfigService) {
    }

    getAuth0SettingsForPassportStrategy(): any {
        return {
            secretOrKeyProvider: passportJwtSecret({
                cache: true,
                rateLimit: true,
                jwksRequestsPerMinute: 5,
                jwksUri: `${this.configService.get<string>('AUTH0_DOMAIN')}.well-known/jwks.json`,
            }),

            audience: this.configService.get<string>('AUTH0_AUDIENCE'),
            issuer: this.configService.get<string>('AUTH0_DOMAIN'),
            algorithms: ['RS256'],
        }
    }
}
