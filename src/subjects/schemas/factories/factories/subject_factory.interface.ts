import { Subject } from "../../subject.schema";

export interface SubjectFactory {
    createSubject(pupilDni:string, name:string, qualification:number):Subject;
}