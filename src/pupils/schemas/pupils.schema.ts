import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { Subject, SubjectSchema } from "../../subjects/schemas/subject.schema";

export type PupilDocument = HydratedDocument<Pupil>;

@Schema()
export class Pupil {
    @Prop({
        required: true,
        get: (value: string) => value.replaceAll(/\[a-zA-Z\s]/g, " ").trim(),
        set: (value: string) => value.replaceAll(/\[a-zA-Z\s]/g, " ").trim()
    })
    name: string;

    @Prop({
        required: true,
        get: (value: string) => value.replaceAll(/\[a-zA-Z\s]/g, " ").trim(),
        set: (value: string) => value.replaceAll(/\[a-zA-Z\s]/g, " ").trim()
    })
    surname: string;

    @Prop({
        required: true,
        get: (value: string) => value.replaceAll(/\[a-zA-Z\s]/g, " ").trim(),
        set: (value: string) => value.replaceAll(/\[a-zA-Z\s]/g, " ").trim()
    })
    dni: string;

    @Prop({
        required: true,
        get: (value: string) => value.replaceAll(/\[a-zA-Z\s]/g, " ").trim(),
        set: (value: string) => value.replaceAll(/\[a-zA-Z\s]/g, " ").trim()
    })
    section: string;

    @Prop({
        type: [{ type: SubjectSchema }],
        get: (subjects: Subject[]) => subjects,
        set: (subjects: Subject[]) => subjects,
    })
    subjects: [];
}

export const PupilSchema = SchemaFactory.createForClass(Pupil);

PupilSchema.set('toJSON', { getters: true });
PupilSchema.set('toObject', { getters: true });