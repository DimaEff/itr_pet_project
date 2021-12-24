import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';

import { ManagementService } from '../management/management.service';


@Injectable()
export class RolesService {
    constructor(private httpService: HttpService,
                private managementService: ManagementService) {
    }

    async getAll(): Promise<any> {
        const res = await this.fetchAll();
        return res.data;
    }

    private async fetchAll(): Promise<AxiosResponse<any>> {
        const conf = await this.managementService.getBaseRequestConfig();

        return this.httpService.get(
            this.getBaseApiUrl(),
            conf,
        ).toPromise();
    }

    private getBaseApiUrl() {
        const scope = this.managementService.scopes.Roles;
        return this.managementService.getBaseApiUrl(scope);
    }
}
