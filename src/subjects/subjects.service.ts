import { Inject, Injectable } from '@nestjs/common';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { Model } from 'mongoose';
import { Subject } from './schemas/subject.schema';
import { InjectModel } from '@nestjs/mongoose';
import { SubjectFactory } from './schemas/factories/subject_factory.interface';

/**
 * Servicio para manejar la lógica de negocio relacionada con las asignaturas.
 */
@Injectable()
export class SubjectsService {

  /**
   * Crea una nueva instancia de `SubjectsService`.
   * @param subjectFactory - Fábrica utilizada para crear instancias de `Subject`.
   * @param subjectModel - Modelo de Mongoose para `Subject`.
   */
  constructor(
    @Inject('SubjectFactory') private readonly subjectFactory: SubjectFactory,
    @InjectModel(Subject.name) private readonly subjectModel: Model<Subject>
  ) { }

  /**
   * Crea una nueva asignatura en la base de datos.
   * - Extrae los datos del DTO.
   * - Utiliza la fábrica de asignaturas para crear una instancia de `Subject`.
   * - Crea una nueva instancia del modelo `Subject` con la instancia creada.
   * - Guarda la nueva asignatura en la base de datos.
   * @param createSubjectDto - Datos necesarios para crear una nueva asignatura.
   * @returns La asignatura recién creada.
   * @throws Error si ocurre un problema al crear la asignatura.
   */
  async create(createSubjectDto: CreateSubjectDto): Promise<Subject> {
    try {
      // Extrae los datos del DTO
      const { pupilDni, subjectName, qualification } = createSubjectDto;

      // Usa la fábrica para crear una nueva instancia de asignatura
      const subjectInstance = this.subjectFactory.createSubject(pupilDni, subjectName, qualification);

      // Crea una nueva instancia del modelo con la instancia de asignatura
      const createdSubject = new this.subjectModel(subjectInstance);

      // Verifica si la asignatura fue creada exitosamente
      createdSubject ? console.info("Se creó correctamente la asignatura.") : console.error("Algo pasó al asignar los datos.");

      // Guarda la nueva asignatura en la base de datos
      return await createdSubject.save();
    } catch (error) {
      // Manejo de errores al crear la asignatura
      throw new Error(`Ocurrió un error al crear la asignatura: \n${error}`);
    }
  }

  /**
   * Obtiene todas las asignaturas de la base de datos.
   * - Consulta todos los documentos en la colección de asignaturas.
   * @returns Una lista de todas las asignaturas.
   */
  async findAll(): Promise<Subject[]> {
    // Devuelve todas las asignaturas en la base de datos
    return await this.subjectModel.find().exec();
  }

  /**
   * Busca una asignatura por el DNI del alumno.
   * - Realiza una búsqueda en la colección de asignaturas utilizando el DNI del alumno.
   * - Si se encuentra la asignatura, la devuelve; si no, devuelve `null`.
   * @param pupilDni - DNI del alumno asociado a la asignatura.
   * @returns La asignatura encontrada o `null` si no existe.
   * @throws Error si ocurre un problema al buscar la asignatura.
   */
  async findOne(pupilDni: string): Promise<Subject | null> {
    try {
      // Busca una asignatura con el DNI del alumno
      const subjectExist = await this.subjectModel.findOne({ pupilDni }).exec();

      // Verifica si se encontró el documento
      subjectExist ? console.info(`Se encontró el documento correspondiente al alumno con DNI: ${pupilDni}`) : console.error(`Documento inexistente`);

      // Devuelve la asignatura encontrada o `null`
      return subjectExist;
    } catch (error) {
      // Manejo de errores al buscar la asignatura
      throw new Error(`Ocurrió un error al buscar el documento solicitado: \n${error}`);
    }
  }

  /**
   * Actualiza una asignatura existente.
   * - Busca la asignatura por ID.
   * - Si la asignatura existe, actualiza los datos con los del DTO.
   * - Guarda los cambios en la base de datos.
   * @param id - ID de la asignatura a actualizar.
   * @param updateSubjectDto - Datos con los que se actualizará la asignatura.
   * @returns La asignatura actualizada.
   * @throws Error si ocurre un problema al actualizar la asignatura o si la asignatura no existe.
   */
  async update(id: string, updateSubjectDto: UpdateSubjectDto): Promise<Subject> {
    try {
      // Busca la asignatura por ID
      const existingSubject = await this.subjectModel.findById(id).exec();

      if (!existingSubject) {
        // Lanza un error si la asignatura no existe
        throw new Error(`La asignatura con ID: ${id} no existe`);
      } else {
        console.info("Se encontró el documento, procediendo con los cambios...");
      }

      // Extrae los datos del DTO
      const { pupilDni, subjectName, qualification } = updateSubjectDto;

      // Actualiza los datos de la asignatura
      if (existingSubject.pupilDni !== undefined && existingSubject.subjectName !== undefined
        && existingSubject.qualification !== undefined) {
        existingSubject.pupilDni = pupilDni;
        existingSubject.subjectName = subjectName;
        existingSubject.qualification = qualification;
        console.info("Cambios realizados correctamente");

        // Guarda los cambios en la base de datos
        return await existingSubject.save();
      } else {
        throw new Error("No se realizaron los cambios solicitados.");
      }
    } catch (error) {
      // Manejo de errores al actualizar la asignatura
      throw new Error(`Ocurrió un error al actualizar el documento: \n${error}`);
    }
  }

  /**
   * Elimina una asignatura por ID.
   * - Busca la asignatura por ID.
   * - Si la asignatura existe, la elimina de la base de datos.
   * @param id - ID de la asignatura a eliminar.
   * @throws Error si ocurre un problema al eliminar la asignatura o si la asignatura no existe.
   */
  async remove(id: string): Promise<void> {
    try {
      // Busca la asignatura por ID
      const subjectExists = await this.subjectModel.findById(id).exec();
      if (subjectExists) {
        // Elimina la asignatura si existe
        await this.subjectModel.findByIdAndDelete(id).exec();
        console.info("El documento se borró correctamente");
      } else {
        console.warn("No se encontró el documento solicitado para removerlo");
      }
    } catch (error) {
      // Manejo de errores al eliminar la asignatura
      throw new Error("No se pudo borrar el documento");
    }
  }
}