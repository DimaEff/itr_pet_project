import { IsNumber, IsString, Length } from 'class-validator';


export class CreateCatDto {
    @IsString()
    @Length(1, 12)
    readonly name;
    @IsNumber()
    readonly age;
    @IsString()
    @Length(1, 12)
    readonly breed;
}