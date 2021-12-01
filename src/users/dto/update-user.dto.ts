import { IsObject } from 'class-validator';


export class UpdateUserDto {
    @IsObject()
    readonly data: any;
}