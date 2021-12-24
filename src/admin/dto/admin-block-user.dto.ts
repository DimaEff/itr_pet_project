import { IsBoolean, IsString } from 'class-validator';


export class AdminBlockUserDto {
    @IsString()
    readonly uid: string;

    @IsBoolean()
    readonly isBlocked: boolean;
}