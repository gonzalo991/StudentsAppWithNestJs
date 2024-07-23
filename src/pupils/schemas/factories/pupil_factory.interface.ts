import { Pupil } from "../pupils.schema";
import { Subject } from "../subject.schema";

export interface PupilFactory {
    createPupil(name:string, surname:string, dni:string, section:string, subjects?:Subject[]):Pupil;
}