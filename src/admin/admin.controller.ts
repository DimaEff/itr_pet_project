import {Body, Controller, Delete, Get, Param, Post, Put, Req, SetMetadata, UseGuards} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

import { UsersService } from '../users/users.service';
import { PermissionGuard, roles } from '../authorization/guards/permissions';
import { AdminBlockUserDto } from './dto/admin-block-user.dto';
import { AdminUpdateUserDto } from './dto/admin-update-user.dto';
import { RolesService } from '../roles/roles.service';
import {AdminAssignRolesDto} from "./dto/admin-assign-roles.dto";


@Controller('admin')
@UseGuards(AuthGuard('jwt'), PermissionGuard)
@SetMetadata('roles', [roles.admin])
export class AdminController {
    constructor(private usersService: UsersService,
                private rolesService: RolesService) {
    }

    @Get('/users')
    getAllUsers() {
        return this.usersService.getAll();
    }

    @Put('/users/update')
    setUserData(@Body() dto: AdminUpdateUserDto, @Req() req: Request) {
        return this.usersService.setUserData(dto, req, dto.uid);
    }

    @Put('/users/block')
    setIsBlockedUser(@Body() dto: AdminBlockUserDto) {
        return this.usersService.setIsBlockedUser(dto);
    }

    @Post('/users/roles')
    assignAdminRole(@Body() dto: AdminAssignRolesDto, @Req() req) {
        return this.usersService.assignRoles(req, dto);
    }

    @Delete('/users/:uid')
    deleteUser(@Param('uid') uid: string, @Req() req: Request) {
        return this.usersService.delete(req, uid);
    }

    @Get('roles')
    getAllRoles() {
        return this.rolesService.getAll();
    }
}