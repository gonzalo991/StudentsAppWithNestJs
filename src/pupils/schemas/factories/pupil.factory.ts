import { Subject } from "src/subjects/schemas/subject.schema";
import { Pupil } from "../pupils.schema";
import { PupilFactory } from "./pupil_factory.interface";

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