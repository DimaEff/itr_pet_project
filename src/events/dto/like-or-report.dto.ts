import {IsString} from "class-validator";

export class LikeOrReportDto {
    @IsString()
    eid: string;

    @IsString()
    uid: string;
}