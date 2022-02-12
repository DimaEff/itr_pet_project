import {IsNumber, IsString, Length, IsDate} from 'class-validator';
import * as Buffer from "buffer";


export class CreateEventDto {
    @IsString()
    @Length(1, 32)
    readonly title: string;

    @IsString()
    @Length(1, 1024)
    readonly description: string;

    @IsString()
    readonly type: string;

    @IsNumber()
    lat: number;

    @IsNumber()
    lng: number;

    @IsDate()
    startDate: Date;

    @IsDate()
    endDate: Date;

    files: Buffer[];

    @IsString()
    uid: string;
}