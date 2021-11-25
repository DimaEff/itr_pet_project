import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { ErrorMessagesService } from '../error-messages/error-messages.service';


@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>,
                private errorMessages: ErrorMessagesService) {
    }

    async auth(dto: CreateUserDto): Promise<User> {
        const user = await this.getUserByEmail(dto.email);

        if (user) {
            return user;
        } else {
            return this.create(dto);
        }
    }

    async findAll(): Promise<User[]> {
        return this.userModel.find();
    }

    async delete(email: string) {
        try {
            await this.userModel.deleteOne({email});
        } catch (e) {
            this.errorMessages.notFound('user');
        }
    }

    private async create(dto: CreateUserDto): Promise<User> {
        return await this.userModel.create(dto);
    }

    private async getUserByEmail(email: string): Promise<User> {
        return this.userModel.findOne({ email });
    }
}
