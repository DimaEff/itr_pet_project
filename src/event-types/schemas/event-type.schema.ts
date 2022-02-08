import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import {Image, ImageSchema} from "../../storage/schemas/image.schema";


export type EventTypeDocument = EventType & Document;

@Schema()
export class EventType {
    @Prop()
    title: string;

    @Prop({unique: true})
    value: string;

    @Prop({type: ImageSchema})
    icon: Image;
}

export const EventTypeSchema = SchemaFactory.createForClass(EventType);