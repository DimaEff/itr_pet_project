import {IsArray, IsOptional, IsString} from "class-validator";


export class AdminAssignRolesDto {
    @IsOptional()
    @IsString()
    uid?: string;

    @IsArray()
    roles: string[];
}