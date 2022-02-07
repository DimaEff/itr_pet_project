import {IsString, Length} from "class-validator";


export class CreateMessageDto {
    @IsString()
    eid: string;

    @IsString()
    uid: string;

    @IsString()
    @Length(1, 256)
    message: string;
}