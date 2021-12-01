import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { Request } from 'express';

import { UpdateUserDto } from './dto/update-user.dto';
import { BlockUserDto } from './dto/block-user.dto';
import { ManagementService } from '../management/management.service';


@Injectable()
export class UsersService {
    constructor(private httpService: HttpService,
                private managementService: ManagementService) {
    }

    async getAll(): Promise<AxiosResponse<any>> {
        const users = await this.fetchAllUsers();

        return users.data;
    }

    async setIsBlockedUser(dto: BlockUserDto): Promise<AxiosResponse<any>> {
        const dataObject = { blocked: dto.isBlocked };
        const res = await this.fetchSetUserData(dto.uid, dataObject);

        return res.data;
    }

    async setUserData(dto: UpdateUserDto, req: Request, uid?: string): Promise<any> {
        const id = uid || this.getUserIdByReq(req);

        return this.fetchSetUserData(id, dto.data);
    }

    async delete(req: Request, uid?: string): Promise<any> {
        const id = uid || this.getUserIdByReq(req);

        return this.fetchDelete(id);
    }

    private async fetchAllUsers(): Promise<AxiosResponse<any>> {
        const conf = await this.managementService.getBaseRequestConfig();

        return this.httpService.get(
            this.getBaseApiUrl(),
            conf,
        ).toPromise();
    }

    private async fetchSetUserData(uid: string, data: object): Promise<AxiosResponse<any>> {
        const conf = await this.managementService.getBaseRequestConfig();

        return this.httpService.patch(
            this.getBaseApiUrl(uid),
            data,
            conf,
        ).toPromise();
    }

    private async fetchDelete(uid: string): Promise<AxiosResponse<any>> {
        const conf = await this.managementService.getBaseRequestConfig();

        return this.httpService.delete(
            this.getBaseApiUrl(uid),
            conf,
        ).toPromise();
    }

    private getUserIdByReq(req: Request): string {
        return req.user['sub'];
    }

    private getBaseApiUrl(uid = ''): string {
        const scope = this.managementService.scopes.Users;
        return this.managementService.getBaseApiUrl(scope) + (uid ? `/${uid}` : '');
    }
}
