import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';


@Controller('cats')
export class CatsController {
    constructor(private catsService: CatsService) {
    }

    @UseGuards(AuthGuard('jwt'))
    @Post()
    create(@Body() dto: CreateCatDto) {
        return this.catsService.create(dto);
    }

    @Get()
    getAll() {
        return this.catsService.findAll();
    }
}
