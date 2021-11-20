import { IsNumber, IsString } from 'class-validator';


export class CreateCatDto {
    @IsString()
    readonly name;
    @IsNumber()
    readonly age;
    @IsString()
    readonly breed;
}