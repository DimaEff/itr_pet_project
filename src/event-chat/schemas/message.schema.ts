import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


export type MessageDocument = Message & Document;

@Schema({timestamps: true})
export class Message {
    // event ID
    @Prop()
    eid: string;

    @Prop()
    uid: string;

    @Prop()
    message: string;
}

export const MessageSchema = SchemaFactory.createForClass(Message);