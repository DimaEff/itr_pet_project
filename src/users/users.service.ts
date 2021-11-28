import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { BehaviorSubject, Observable, take } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

import { UpdateUserDto } from './dto/update-user.dto';


@Injectable()
export class UsersService {
    private readonly domain: string;
    private readonly clientId: string;
    private readonly clientSecret: string;
    private readonly audience: string;

    constructor(private httpService: HttpService,
                private configService: ConfigService) {
        this.domain = configService.get('AUTH0_DOMAIN');
        this.clientId = configService.get('AUTH0_CLIENT_ID');
        this.clientSecret = configService.get('AUTH0_CLIENT_SECRET');
        this.audience = configService.get('AUTH0_MANAGEMENT_API_AUDIENCE');
    }

    async setUserData(dto: UpdateUserDto, req: Request): Promise<any> {
        const uid = req.user['sub'];
        const token = await this.fetchManagementAPIToken();
        console.log(uid, token);
        const newData = this.fetchSetUserData(uid, token, dto.data)
            .then(v => console.log(v))
            .catch(e => console.log(e));

        return newData;
    }

    private fetchSetUserData(uid: string, token: string, data: object): Promise<AxiosResponse<any>> {
        const url = this.domain + `api/v2/users/${uid}`;
        console.log(url);

        return this.httpService.patch(
            url,
            { app_metadata: {test: 'test'} },
            {
                headers: {
                    authorization: `Bearer ${token}`,
                    'content-type': 'application/json',
                },
            },
        ).toPromise();
    }

    private async fetchManagementAPIToken(): Promise<string> {
        console.log('ci', this.clientId);
        console.log('cs', this.clientSecret);
        console.log('au', this.audience);

        const res = await this.httpService.post(
            this.domain + 'oauth/token',
            {
                client_id: this.clientId,
                client_secret: this.clientSecret,
                audience: this.audience,
                grant_type: 'client_credentials',
            },
            {
                headers: {
                    'content-type': 'application/json',
                },
            },
        ).toPromise();

        return res.data['access_token'];
    }
}
