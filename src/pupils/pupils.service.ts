import { Inject, Injectable } from '@nestjs/common';
import { CreatePupilDto } from './dto/create-pupil.dto';
import { UpdatePupilDto } from './dto/update-pupil.dto';
import { PupilFactory } from './schemas/factories/pupil_factory.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Pupil } from './schemas/pupils.schema';
import { Model } from 'mongoose';
import { Subject } from 'src/subjects/schemas/subject.schema';

@Injectable()
export class PupilsService {

  constructor(
    @Inject('PupilFactory') private readonly pupilFactory: PupilFactory,
    @InjectModel(Subject.name) private readonly subjectModel: Model<Subject>,
    @InjectModel(Pupil.name) private readonly pupilModel: Model<Pupil>,
  ) { }

  async create(createPupilDto: CreatePupilDto): Promise<Pupil> {
    try {
      let { name, surname, dni, section, subjects } = createPupilDto;

      if (dni && subjects.length === 0) {
        const subjectDocuments = await this.subjectModel.find({ pupilDni: dni }).exec();
        subjectDocuments ? subjects.push(subjectDocuments
          .map(doc => doc.toObject())) : console.info(`El documento ${subjectDocuments} está vacío`);
      }

      const pupil = this.pupilFactory.createPupil(name, surname, dni, section, subjects);
      const createdPupil = new this.pupilModel(pupil);

      return await createdPupil.save();

    } catch (error) {

      throw new Error(`Ocurrio un error al crear el alumno: \n
        ${error}`);

    }
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
    existingPupil.subjects = subjects;

    return await existingPupil.save();
  }

  async remove(id: string): Promise<Pupil> {
    return await this.pupilModel.findByIdAndDelete(id).exec();
  }
}