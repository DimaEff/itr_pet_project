import { IsOptional, IsString, Length } from 'class-validator';


export class CreateRoleDto {
    @IsString()
    @Length(1, 12)
    readonly value: string;

    @IsOptional()
    @IsString()
    @Length(1, 250)
    readonly description?: string;
}