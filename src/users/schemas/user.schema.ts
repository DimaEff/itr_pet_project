import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

import { Role } from '../../roles/schemas/role.schema';


export type UserDocument = User & Document;

@Schema()
export class User {
    @Prop({required: true, unique: true})
    email: string;

    @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Role'}], required: true})
    roles: Role[];

    @Prop({required: true})
    name: string;

    @Prop()
    age: number;

    @Prop()
    about: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
