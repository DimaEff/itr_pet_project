import {Body, Controller, Get, Post, SetMetadata, UseGuards} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';

import {CatsService} from './cats.service';
import {CreateCatDto} from './dto/create-cat.dto';
import {PermissionGuard, roles} from '../authorization/guards/permissions';


@Controller('cats')
export class CatsController {
    constructor(private catsService: CatsService) {
    }

    @UseGuards(AuthGuard('jwt'), PermissionGuard)
    @SetMetadata('roles', roles.admin)
    @Post()
    create(@Body() dto: CreateCatDto) {
        return this.catsService.create(dto);
    }

    @Get()
    getAll() {
        return this.catsService.findAll();
    }
}
