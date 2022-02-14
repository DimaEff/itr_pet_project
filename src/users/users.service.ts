import {Injectable} from '@nestjs/common';
import {HttpService} from '@nestjs/axios';
import {AxiosResponse} from 'axios';
import {Request} from 'express';

import {AdminBlockUserDto} from '../admin/dto/admin-block-user.dto';
import {ManagementService} from '../management/management.service';
import {AdminAssignRolesDto} from "../admin/dto/admin-assign-roles.dto";
import {StorageService} from "../storage/storage.service";


@Injectable()
export class UsersService {
    constructor(private httpService: HttpService,
                private managementService: ManagementService,
                private storageService: StorageService) {
    }

    async getAll(): Promise<any> {
        return this.fetchAllUsers();
    }

    async setIsBlockedUser(dto: AdminBlockUserDto): Promise<AxiosResponse<any>> {
        const dataObject = {blocked: dto.isBlocked};
        const res = await this.fetchSetUserData(dto.uid, dataObject);

        return res.data;
    }

    async setUserData(dto: any, req: Request, uid?: string): Promise<any> {
        const id = this.getId(req, uid);
        return this.fetchSetUserData(id, dto);
    }

    async updatePicture(picture: Express.Multer.File, req: Request, uid?: string): Promise<any> {
        const id = this.getId(req, uid);
        const oldImageFileName = req.user['https://int-map.com/picture'].split('/').pop();

        const image = await this.storageService.save([picture.buffer]);
        await this.storageService.delete([oldImageFileName]);

        return this.fetchSetUserData(id, {picture: image[0].path});
    }

    async delete(req: Request, uid?: string): Promise<any> {
        const id = this.getId(req, uid);
        return this.fetchDelete(id);
    }

    async assignRoles(req: Request, dto: AdminAssignRolesDto) {
        const id = this.getId(req, dto.uid);
        return this.fetchAssignRoles(id, dto.roles);
    }

    private async fetchAllUsers(): Promise<any> {
        const conf = await this.managementService.getBaseRequestConfig();
        const {data} = await this.httpService.get(
            this.getBaseApiUrl(),
            conf
        ).toPromise();

        return data;
    }

    private async fetchSetUserData(uid: string, userData: object): Promise<any> {
        const conf = await this.managementService.getBaseRequestConfig();
        const {data} = await this.httpService.patch(
            this.getBaseApiUrl(uid),
            userData,
            conf,
        ).toPromise();

        return data;
    }

    private async fetchDelete(uid: string): Promise<AxiosResponse<any>> {
        const conf = await this.managementService.getBaseRequestConfig();
        return this.httpService.delete(
            this.getBaseApiUrl(uid),
            conf,
        ).toPromise();
    }

    private async fetchAssignRoles(uid: string, roles: string[]): Promise<AxiosResponse<any>> {
        const conf = await this.managementService.getBaseRequestConfig();
        return this.httpService.post(
            this.getBaseApiUrl(uid),
            {roles},
            conf,
        ).toPromise();
    }

    private static getUserIdByReq(req: Request): string {
        return req.user['sub'];
    }

    private getBaseApiUrl(uid = ''): string {
        const scope = this.managementService.scopes.Users;
        return this.managementService.getBaseApiUrl(scope) + (uid ? `/${uid}` : '');
    }

    private getId = (req: Request, uid?: string): string => {
        return uid || UsersService.getUserIdByReq(req);
    }
}
