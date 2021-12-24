import {IsString, Length} from 'class-validator';


export class CreateEventTypeDto {
    @IsString()
    @Length(1, 12)
    readonly title: string;
}