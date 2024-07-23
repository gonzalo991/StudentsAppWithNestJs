import { Subject } from "../subject.schema";
import { SubjectFactory } from "./subject_factory.interface";

// Implementación de los métodos de la interfaz de la fábrica de materias
export class SubjectFactoryImpl implements SubjectFactory {
    createSubject(subjectName: string, qualification: number): Subject {
        const subject = new Subject();
        subject.subjectName = subjectName;
        subject.qualification = qualification;
        return subject;
    }
}