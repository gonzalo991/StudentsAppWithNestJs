import { Inject, Injectable } from '@nestjs/common';
import { CreatePupilDto } from './dto/create-pupil.dto';
import { UpdatePupilDto } from './dto/update-pupil.dto';
import { PupilFactory } from './schemas/factories/pupil_factory.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Pupil } from './schemas/pupils.schema';
import { SubjectFactory } from './schemas/factories/subject_factory.interface';
import { Model } from 'mongoose';

@Injectable()
export class PupilsService {

  constructor(
    @Inject('PupilFactory') private readonly pupilFactory: PupilFactory,
    @Inject('SubjectFactory') private readonly subjectFactory: SubjectFactory,
    @InjectModel(Pupil.name) private readonly pupilModel: Model<Pupil>,
  ) { }

  async create(createPupilDto: CreatePupilDto): Promise<Pupil> {
    const { name, surname, dni, section, subjects } = createPupilDto;

    const subjectInstance = subjects.map(subject => this.subjectFactory
      .createSubject(subject.subjectName, subject.qualification));

    const pupil = this.pupilFactory.createPupil(name, surname, dni, section, subjectInstance);
    const createdPupil = new this.pupilModel(pupil);

    return await createdPupil.save();
  }

  async findAll(): Promise<Pupil[]> {
    return await this.pupilModel.find().exec();
  }

  async findOne(id: string): Promise<Pupil> {
    return await this.pupilModel.findById(id).exec();
  }

  async update(id: string, updatePupilDto: UpdatePupilDto) {
    const existingPupil = await this.pupilModel.findById(id).exec();

    if (!existingPupil) {
      throw new Error(`Pupil with id: ${id} does not exists`);
    }

    const { name, surname, dni, section, subjects } = updatePupilDto;

    if (name !== undefined) existingPupil.name = name;
    if (surname !== undefined) existingPupil.surname = surname;
    if (dni !== undefined) existingPupil.dni = dni;
    if (section !== undefined) existingPupil.section = section;

    if (subjects !== undefined) {
      const subjectInstances = subjects.map(subject => this.subjectFactory
        .createSubject(subject.subjectName, subject.qualification));
      existingPupil.subjects = subjectInstances;
    }

    return await existingPupil.save();
  }

  async remove(id: string): Promise<Pupil> {
    return await this.pupilModel.findOneAndDelete(id).exec();
  }
}
