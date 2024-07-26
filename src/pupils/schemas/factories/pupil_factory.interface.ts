import { Pupil } from "../pupils.schema";

export interface PupilFactory {
    createPupil(name:string, surname:string, dni:string, section:string, subjects:any[]):Pupil;
}