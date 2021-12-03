import { Body, Controller, Delete, Get, Param, Put, Req, SetMetadata, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

import { UsersService } from '../users/users.service';
import { PermissionGuard, roles } from '../authorization/guards/permissions';
import { BlockUserDto } from '../users/dto/block-user.dto';
import { AdminUpdateUserDto } from './dto/admin-update-user.dto';
import { RolesService } from '../roles/roles.service';


@Controller('admin')
@UseGuards(AuthGuard('jwt'), PermissionGuard)
export class AdminController {
    constructor(private usersService: UsersService,
                private rolesService: RolesService) {
    }

    @SetMetadata('roles', [roles.admin])
    @Get('/users')
    getAllUsers() {
        return this.usersService.getAll();
    }

    @SetMetadata('roles', [roles.admin])
    @Put('/users/update')
    setUserDate(@Body() dto: AdminUpdateUserDto, @Req() req: Request) {
        return this.usersService.setUserData(dto, req, dto.uid);
    }

    @SetMetadata('roles', [roles.admin])
    @Put('/users/block')
    setIsBlockedUser(@Body() dto: BlockUserDto) {
        return this.usersService.setIsBlockedUser(dto);
    }

    @SetMetadata('roles', [roles.admin])
    @Delete('/users/:uid')
    delete(@Param('uid') uid: string, @Req() req: Request) {
        return this.usersService.delete(req, uid);
    }

    @SetMetadata('roles', [roles.admin])
    @Get('roles')
    getAllRoles() {
        return this.rolesService.getAll();
    }
}