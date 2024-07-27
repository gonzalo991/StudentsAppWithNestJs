import { Subject } from "src/subjects/schemas/subject.schema";
import { Pupil } from "../pupils.schema";
import { PupilFactory } from "./pupil_factory.interface";

/**
 * Implementación del patrón de diseño factory method
 * Define un metodo que recibe los parámetros necesarios para crear 
 * una instancia de alumno mediante dichos parámetros
 * Devueolve la instancia de alumno
 */
export class PupilFactoryImpl implements PupilFactory {
    createPupil(name: string, surname: string, dni: string, section: string, subjects: Subject[]): Pupil {
        const pupil = new Pupil();
        pupil.name = name;
        pupil.surname = surname;
        pupil.dni = dni;
        pupil.section = section;
        pupil.subjects = subjects;
        return pupil;
    }
}