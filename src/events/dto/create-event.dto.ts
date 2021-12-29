import {IsString, Length} from 'class-validator';


export class CreateEventDto {
    @IsString()
    @Length(1, 30)
    readonly title: string;

    @IsString()
    @Length(1, 350)
    readonly description: string;

    @IsString()
    readonly type: string;
}