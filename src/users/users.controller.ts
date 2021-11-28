import { Body, Controller, UseGuards, Req, Post } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {Request} from 'express';

import {UsersService} from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';


@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {
    }

    @UseGuards(AuthGuard('jwt'))
    @Post()
    update(@Body() dto: UpdateUserDto, @Req() req: Request) {
        // console.log(req);
        return this.usersService.setUserData(dto, req);
        // return {message: 'ok'};
    }
}
