import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type SubjectDocument = HydratedDocument<Subject>;

@Schema()
export class Subject {
    @Prop({
        required: true,
        get: (value: string) => value.trim(),
        set: (value: string) => value.trim()
    })
    pupilDni: string;

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
        min: [0, 'Qualification cannot be negative'],
        max: [100, 'Qualification cannot be more than 100']
    })
    qualification: number;

}

export const SubjectSchema = SchemaFactory.createForClass(Subject);