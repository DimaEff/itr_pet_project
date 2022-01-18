import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import {Socket} from "socket.io";

import {AuthorizationService} from "../authorization.service";


const jwtExtractor = (req: Socket) => {
    return ExtractJwt.fromUrlQueryParameter('jwt_token')(req.handshake);
}

@Injectable()
export class JwtWSStrategy extends PassportStrategy(Strategy, 'jwt-ws') {
    constructor(private authService: AuthorizationService) {
        super({
            ...authService.getAuth0SettingsForPassportStrategy(),
            jwtFromRequest: ExtractJwt.fromExtractors([jwtExtractor]),
        });
    }

    validate(payload: unknown): unknown {
        return payload;
    }
}