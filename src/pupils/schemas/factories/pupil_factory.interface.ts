import { Pupil } from "../pupils.schema";

/**
 * Se crea una interface para la implementación del patrón de diseño factory method
 */
export interface PupilFactory {
    createPupil(name:string, surname:string, dni:string, section:string, subjects:any[]):Pupil;
}