import { Subject } from 'src/subjects/schemas/subject.schema';

export class CreatePupilDto {
    readonly name: string;
    readonly surname: string;
    readonly dni: string;
    readonly section: string;
    subjects?: any[];
}