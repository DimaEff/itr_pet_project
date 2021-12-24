import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


export type EventTypeDocument = EventType & Document;

@Schema()
export class EventType {
    @Prop()
    title: string;

    @Prop()
    iconUrl: string;
}

export const EventTypeSchema = SchemaFactory.createForClass(EventType);