import {IsNumber, IsString, Length, IsNotEmpty} from 'class-validator';
import {Type} from 'class-transformer';


class CoordinateDto {
    @IsNumber()
    lat: number;

    @IsNumber()
    lng: number;
}

export class CreateEventDto {
    @IsString()
    @Length(1, 30)
    readonly title: string;

    @IsString()
    @Length(1, 350)
    readonly description: string;

    @IsString()
    readonly type: string;

    @IsNotEmpty()
    @Type(() => CoordinateDto)
    coordinate: CoordinateDto;
}