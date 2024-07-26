import { Inject, Injectable } from '@nestjs/common';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { Model } from 'mongoose';
import { Subject } from './schemas/subject.schema';
import { InjectModel } from '@nestjs/mongoose';
import { SubjectFactory } from './schemas/factories/subject_factory.interface';

@Injectable()
export class SubjectsService {

  constructor(
    @Inject('SubjectFactory') private readonly subjectFactory: SubjectFactory,
    @InjectModel(Subject.name) private readonly subjectModel: Model<Subject>
  ){}

  async create(createSubjectDto: CreateSubjectDto): Promise<Subject> {
    const {pupilDni, subjectName, qualification} = createSubjectDto;
    const subjectInstance = this.subjectFactory.createSubject(pupilDni, subjectName, qualification);
    const createdSubject = new this.subjectModel(subjectInstance);

    return await createdSubject.save();
  }

  async findAll() {
    return await this.subjectModel.find().exec();
  }

  async findOne(pupilDni: string) {
    return await this.subjectModel.findOne({pupilDni}).exec();
  }

  async update(id: string, updateSubjectDto: UpdateSubjectDto): Promise<Subject> {
    const existingSubject = await this.subjectModel.findByIdAndUpdate(id).exec();
    if(!existingSubject){
      throw new Error(`The subjects with pupil dni: ${id} doesn't exists`);
    }

    const { pupilDni, subjectName, qualification} = updateSubjectDto;
    existingSubject.pupilDni = pupilDni;
    existingSubject.subjectName = subjectName;
    existingSubject.qualification = qualification;

    return await existingSubject.save();
  }

  async remove(id: string) {
    return await this.subjectModel.findByIdAndDelete(id).exec();
  }
}