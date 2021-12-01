import { IsBoolean, IsString } from 'class-validator';


export class BlockUserDto {
    @IsString()
    readonly uid: string;

    @IsBoolean()
    readonly isBlocked: boolean;
}