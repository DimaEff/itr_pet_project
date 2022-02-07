import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import {Document} from 'mongoose';

import {EventType} from '../../event-types/schemas/event-type.schema';
import {Image, ImageSchema} from "../../storage/schemas/image.schema";


export type EventDocument = Event & Document;

@Schema()
export class Event {
    @Prop()
    title: string;

    @Prop()
    description: string;

    @Prop({type: [ImageSchema]})
    images: Image[];

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'EventType'})
    // @Prop({subtype: mongoose.Schema.Types.Subdocument, ref: 'EventType'})
    type: EventType;

    @Prop()
    lat: number;

    @Prop()
    lng: number;

    @Prop()
    startDate: Date;

    @Prop()
    endDate: Date;

    @Prop()
    uid: string;
}

export const EventSchema = SchemaFactory.createForClass(Event);