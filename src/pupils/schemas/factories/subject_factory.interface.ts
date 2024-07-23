import { Subject } from "../subject.schema";

export interface SubjectFactory {
    createSubject(name:string, qualification:number):Subject;
}