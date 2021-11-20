import { Body, Controller, Get, Post } from '@nestjs/common';

import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';


@Controller('cats')
export class CatsController {
    constructor(private catsService: CatsService) {
    }

    @Post()
    create(@Body() dto: CreateCatDto) {
        return this.catsService.create(dto);
    }

    @Get()
    getAll() {
        return this.catsService.findAll();
    }
}