import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';

import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { AuthorizationGuard } from '../authorization/authorization.guard';


@Controller('cats')
export class CatsController {
    constructor(private catsService: CatsService) {
    }

    @UseGuards(AuthorizationGuard)
    @Post()
    create(@Body() dto: CreateCatDto) {
        return this.catsService.create(dto);
    }

    @Get()
    getAll() {
        return this.catsService.findAll();
    }
}
