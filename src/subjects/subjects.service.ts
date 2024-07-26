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
  ) { }

  async create(createSubjectDto: CreateSubjectDto): Promise<Subject> {
    try {

      const { pupilDni, subjectName, qualification } = createSubjectDto;
      const subjectInstance = this.subjectFactory.createSubject(pupilDni, subjectName, qualification);
      const createdSubject = new this.subjectModel(subjectInstance);
      createdSubject ? console.info("Se creo correctamente lña asignatura.") : console.error("Algo pasó al asignar los datos.");
      return await createdSubject.save();

    } catch (error) {
      throw new Error(`Ocurrió un error al crear la asignatura: \n
      ${error}`);
    }
  }

  async findAll() {
    return await this.subjectModel.find().exec();
  }

  async findOne(pupilDni: string) {
    try {

      const subjectExist = await this.subjectModel.findOne({ pupilDni }).exec();
      subjectExist ? console.info(`Se encontro el documento correspondiente al alumno con dni: ${pupilDni}`) : console.error(`Documento inexistente`);
      return subjectExist;

    } catch (error) {

      throw new Error(`Ocurrió un error al buscar el documento solicitado: \n
        ${error}`);

    }
  }

  async update(id: string, updateSubjectDto: UpdateSubjectDto): Promise<Subject> {
    try {

      const existingSubject = await this.subjectModel.findByIdAndUpdate(id).exec();

      if (existingSubject)
        throw new Error(`The subjects with pupil dni: ${id} doesn't exists`);
      else
        console.info("Se encontró el documento, procediendo con los cambios...")

      const { pupilDni, subjectName, qualification } = updateSubjectDto;

      if (existingSubject.pupilDni !== undefined && existingSubject.subjectName !== undefined
        && existingSubject.qualification !== undefined) {
        existingSubject.pupilDni = pupilDni;
        existingSubject.subjectName = subjectName;
        existingSubject.qualification = qualification;
        console.info("Cambios realizados correctamente");

        return await existingSubject.save();
      } else {
        throw new Error("No se realizaron los cambios solicitados.");
      }

    } catch (error) {

      throw new Error(`Ocurrió un error al actualizar el documento: \n
        ${error}`)

    }
  }

  async remove(id: string) {
    try {
      const subjectExists = await this.subjectModel.findById(id).exec();
      if (subjectExists) {
        await this.subjectModel.findByIdAndDelete(id).exec();
        console.info("El documento se borró correctamente");
      } else {
        console.warn("No se encontró el documento solicitado para removerlo");
      }
    } catch (error) {
      throw new Error("No se pudo borrar el documento");
    }
  }
}