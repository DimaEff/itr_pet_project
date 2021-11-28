import { IsNumber, IsString, Length } from 'class-validator';


export class CreateCatDto {
    @IsString()
    @Length(1, 12)
    readonly name: string;

    @IsNumber()
    readonly age: number;

    @IsString()
    @Length(1, 12)
    readonly breed: string;
}