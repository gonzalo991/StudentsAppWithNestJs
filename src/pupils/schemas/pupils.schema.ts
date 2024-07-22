import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { Subject, SubjectSchema } from "./subject.schema";

export type PupilDocument = HydratedDocument<Pupil>;

@Schema()
export class Pupil {
    @Prop({required: true})
    name: string;

    @Prop({required: true})
    surname: string;

    @Prop({required: true})
    dni: string;

    @Prop({require: true})
    section: string;

    @Prop({type: SubjectSchema, default: []})
    subject: Subject[];
}

export const PupilSchema = SchemaFactory.createForClass(Pupil);