import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type SubjectDocument = HydratedDocument<Subject>;

@Schema()
export class Subject {

    @Prop({ required: true })
    subjectName: string;

    @Prop({ required: true })
    qualification: number;

}

export const SubjectSchema = SchemaFactory.createForClass(Subject);