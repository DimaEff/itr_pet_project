import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User, UserSchema } from './schemas/user.schema';
import { ErrorMessagesModule } from '../error-messages/error-messages.module';


@Module({
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        ErrorMessagesModule,
    ],
    providers: [UsersService],
    controllers: [UsersController],
})
export class UsersModule {
}
