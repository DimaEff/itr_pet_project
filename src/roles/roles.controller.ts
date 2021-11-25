import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';


@Controller('roles')
export class RolesController {
    constructor(private rolesService: RolesService) {
    }

    @UseGuards(AuthGuard('jwt'))
    @Post()
    create() {
        // console.log(req);
        // return this.rolesService.create(dto);
    }

    @Get()
    getAll() {
        return this.rolesService.findAll();
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete('delete/:value')
    delete(@Param('value') value: string) {
        return this.rolesService.delete(value);
    }
}