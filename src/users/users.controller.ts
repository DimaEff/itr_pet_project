import { Body, Controller, Get, Post, SetMetadata, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import {UsersService} from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { PermissionGuard, rolesPermissions } from '../authorization/permissions';


// Я буду менять UserController. Пока еще не придумал как)
// Пока что он тут просто в виде примера.
@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {
    }

    @UseGuards(AuthGuard('jwt'), PermissionGuard)
    @SetMetadata('permission', rolesPermissions.admin)
    @Get()
    auth(@Body() dto: CreateUserDto) {
        return this.usersService.auth(dto);
    }

    @Get()
    getAll() {
        return this.usersService.findAll();
    }
}