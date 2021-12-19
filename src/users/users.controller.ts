import { Body, Controller, Delete, Put, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

import {UsersService} from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';


@Controller('users')
@UseGuards(AuthGuard('jwt'))
export class UsersController {
    constructor(private usersService: UsersService) {
    }

    @Put('/update')
    setUserDate(@Body() dto: UpdateUserDto, @Req() req) {
        return this.usersService.setUserData(dto, req);
    }

    @Delete('/')
    delete(@Req() req: Request) {
        return this.usersService.delete(req);
    }
}