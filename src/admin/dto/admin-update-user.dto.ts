import { IsString } from 'class-validator';

import { UpdateUserDto } from '../../users/dto/update-user.dto';


export class AdminUpdateUserDto extends UpdateUserDto{
    @IsString()
    readonly uid: string;
}