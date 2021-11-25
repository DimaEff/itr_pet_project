import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Role, RoleDocument } from './schemas/role.schema';
import { CreateRoleDto } from './dto/create-role.dto';
import { HelperService } from '../helper/helper.service';
import { ErrorMessagesService } from '../error-messages/error-messages.service';


@Injectable()
export class RolesService {
    constructor(@InjectModel(Role.name) private roleModel: Model<RoleDocument>,
                private helperService: HelperService,
                private errorMessagesService: ErrorMessagesService) {
    }

    async create(dto: CreateRoleDto): Promise<Role> {
        const role = await this.getRoleByValue(dto.value);
        if (role) {
            this.errorMessagesService.isExist('role');
        }

        return await this.roleModel.create(this.helperService.normalizeDtoProps(dto, ['value']));
    }

    async findAll(): Promise<Role[]> {
        return this.roleModel.find();
    }

    async delete(value: string) {
        try {
            console.log(value);
            await this.roleModel.deleteOne({ value: value.toLowerCase() });
        } catch (e) {
            this.errorMessagesService.notFound('role');
        }
    }

    private async getRoleByValue(value: string): Promise<Role> {
        return this.roleModel.findOne({ value: value.toLowerCase() });
    }
}
