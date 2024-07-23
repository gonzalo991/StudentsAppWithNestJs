import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type SubjectDocument = HydratedDocument<Subject>;

@Schema()
export class Subject {

    @Prop({
        required: true,
        get: (value: string) => value.replaceAll(/\[a-zA-Z\s]/g, " ").trim(),
        set: (value: string) => value.replaceAll(/\[a-zA-Z\s]/g, " ").trim()
    })
    subjectName: string;

    @Prop({
        required: true,
        get: (value: number) => value,
        set: (value: number) => value,
        min: [0, 'Grade cannot be negative'],
        max: [10, 'Grade cannot be more than 100']
    })
    qualification: number;

}

export const SubjectSchema = SchemaFactory.createForClass(Subject);

SubjectSchema.set('toJSON', { getters: true });
SubjectSchema.set('toObject', { getters: true });