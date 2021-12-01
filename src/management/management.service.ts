import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { AxiosResponse } from 'axios';


enum Scopes {
    Users = 'users',
    Roles = 'roles',
}

@Injectable()
export class ManagementService {
    private readonly domain: string;
    private readonly clientId: string;
    private readonly clientSecret: string;
    private readonly audience: string;

    readonly scopes = Scopes;

    constructor(private httpService: HttpService,
                private configService: ConfigService) {
        this.domain = configService.get('AUTH0_DOMAIN');
        this.clientId = configService.get('AUTH0_CLIENT_ID');
        this.clientSecret = configService.get('AUTH0_CLIENT_SECRET');
        this.audience = configService.get('AUTH0_MANAGEMENT_API_AUDIENCE');
    }

    async getManagementAPIToken(): Promise<string> {
        const res = await this.fetchManagementAPIToken();

        return res.data['access_token'];
    }

    async getBaseRequestConfig(withoutToken = false): Promise<any> {
        const configObject = {
            headers: {
                'content-type': 'application/json',
            },
        };

        if (!withoutToken) {
            const token = await this.getManagementAPIToken();
            configObject.headers['authorization'] = `Bearer ${token}`;
        }

        return configObject;
    }

    getBaseApiUrl(scope: Scopes): string {
        return this.domain + `api/v2/${scope}`;
    }

    private async fetchManagementAPIToken(): Promise<AxiosResponse<any>> {
        return await this.httpService.post(
            this.domain + 'oauth/token',
            {
                client_id: this.clientId,
                client_secret: this.clientSecret,
                audience: this.audience,
                grant_type: 'client_credentials',
            },
            await this.getBaseRequestConfig(true),
        ).toPromise();
    }
}
