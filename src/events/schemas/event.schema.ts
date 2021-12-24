import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from "mongoose";

import {EventType} from '../../event-types/schemas/event-type.schema';


export type EventDocument = Event & Document;

@Schema()
export class Event {
    @Prop()
    title: string;

    @Prop()
    description: string;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'EventType' })
    type: EventType;
}

export const EventSchema = SchemaFactory.createForClass(Event);