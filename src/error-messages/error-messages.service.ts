import { HttpException, HttpStatus, Injectable } from '@nestjs/common';


@Injectable()
export class ErrorMessagesService {
    isExist(name: string): void {
        throw new HttpException(`This ${name} already exist`, HttpStatus.BAD_REQUEST);
    }

    notFound(name: string): void {
        throw new HttpException(`This ${name} is not found`, HttpStatus.NOT_FOUND);
    }
}
