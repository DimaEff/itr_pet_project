import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import {AuthorizationService} from "../authorization.service";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthorizationService) {
        super({
            ...authService.getAuth0SettingsForPassportStrategy(),
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        });
    }

    validate(payload: unknown): unknown {
        return payload;
    }
}