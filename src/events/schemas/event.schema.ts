import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import * as mongoose from 'mongoose';

import {EventType} from '../../event-types/schemas/event-type.schema';
import {Image, ImageSchema} from "../../storage/schemas/image.schema";


// @Schema({_id: false})
// class Coordinate extends Document {
//     @Prop()
//     lat: number;
//
//     @Prop()
//     lng: number;
// }
//
// const CoordinateSchema = SchemaFactory.createForClass(Coordinate);

export type EventDocument = Event & Document;

@Schema()
export class Event {
    @Prop()
    title: string;

    @Prop()
    description: string;

    @Prop({type: [ImageSchema]})
    images: Image[];

    @Prop({ref: 'EventType', subtype: mongoose.Schema.Types.Subdocument})
    type: EventType;

    @Prop()
    lat: number;

    @Prop()
    lng: number;

    // @Prop({type: CoordinateSchema})
    // coordinate: Coordinate;
}

export const EventSchema = SchemaFactory.createForClass(Event);