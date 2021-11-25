import { IsNumber, IsOptional, IsString, Length } from 'class-validator';


export class CreateUserDto {
    @IsString()
    @Length(1, 12)
    readonly email: string;

    @IsString()
    @Length(1, 12)
    readonly name: string;

    @IsOptional()
    @IsNumber()
    readonly age?: number;

    @IsOptional()
    @IsString()
    @Length(1, 250)
    readonly about?: string;
}