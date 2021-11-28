import { IsOptional, IsObject } from 'class-validator';


export class UpdateUserDto {
    @IsOptional()
    @IsObject()
    readonly data?: any;
}