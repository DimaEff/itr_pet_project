import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Document} from "mongoose";


@Schema({_id: false})
export class Image extends Document {
    @Prop()
    filename: string;

    @Prop()
    path: string;
}

export const ImageSchema = SchemaFactory.createForClass(Image);