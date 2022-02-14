import {Body, Controller, Delete, Put, Req, UploadedFile, UseGuards, UseInterceptors} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {Request} from 'express';

import {UsersService} from './users.service';
import {FileInterceptor} from "@nestjs/platform-express";


@Controller('profile')
@UseGuards(AuthGuard('jwt'))
export class UsersController {
    constructor(private usersService: UsersService) {
    }

    @Put('/update')
    updateUserData(@Body() dto: any, @Req() req) {
        console.log('controller', req.user);
        return this.usersService.setUserData(dto, req);
    }

    @Put('/picture')
    @UseInterceptors(FileInterceptor('picture'))
    updatePicture(@UploadedFile() picture: Express.Multer.File, @Req() req) {
        return this.usersService.updatePicture(picture, req);
    }

    @Delete('/')
    delete(@Req() req: Request) {
        return this.usersService.delete(req);
    }
}