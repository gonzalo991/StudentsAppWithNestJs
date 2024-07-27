import { Inject, Injectable } from '@nestjs/common';
import { CreatePupilDto } from './dto/create-pupil.dto';
import { UpdatePupilDto } from './dto/update-pupil.dto';
import { PupilFactory } from './schemas/factories/pupil_factory.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Pupil } from './schemas/pupils.schema';
import { Model } from 'mongoose';
import { Subject } from 'src/subjects/schemas/subject.schema';

/**
 * Servicio para manejar la lógica de negocio relacionada con los alumnos
 */
@Injectable()
export class PupilsService {

  /**
   * Constructor que crea una nueva instancuia de PupilsService
   * @param pupilFactory fabrica utilizada para crear instancias de alumnos
   * @param subjectModel modelo de las asignaturas
   * @param pupilModel  modelo de los alumnos
   */
  constructor(
    @Inject('PupilFactory') private readonly pupilFactory: PupilFactory,
    @InjectModel(Subject.name) private readonly subjectModel: Model<Subject>,
    @InjectModel(Pupil.name) private readonly pupilModel: Model<Pupil>,
  ) { }

  /**
   * Método para crear un alumno en la base de datos
   * Utiliza los datos del DTO
   * Evalúa si el dni y las asignaturas(subjects) existen entre los datos enviados por el usuario
   * En caso de existir crea una constante en donde se guardarán los valores de las asignaturas
   * que serán extraidos de la base de datos usando el dni del alumno para relacionarlos
   * Usa la fabrica de alumnos para crear una instancia de alumno
   * Crea una nueva instancia del model con la instancia ya creada por la fábrica
   * Guarda la instancia en la base de datos
   * @param createPupilDto Datos necesarios para instanciar el alumno
   * @returns devuelve el alumno recién creado
   * @throws Devuelve un mensaje de error y el tipo de error en caso de que haya algun problema
   * durante la creación y el guardado del alumno
   */
  async create(createPupilDto: CreatePupilDto): Promise<Pupil> {
    try {
      // Obtiene los datos del DTO
      let { name, surname, dni, section, subjects } = createPupilDto;

      // Evalua si el usuario envió los valores dni y subjects para luego crear
      // una constante con los valores de las asignatruras encontradas en la base de datos
      if (dni && subjects.length === 0) {
        const subjectDocuments = await this.subjectModel.find({ pupilDni: dni }).exec();
        subjectDocuments ? subjects = subjectDocuments
          .map(doc => doc.toObject()) : console.info(`El documento ${subjectDocuments} está vacío`);
      }

      // Crea una instancia de alumno usando la fábrica
      const pupil = this.pupilFactory.createPupil(name, surname, dni, section, subjects);
      // Crea una nueva instancia del modelo de alumno con la instancia anterior
      const createdPupil = new this.pupilModel(pupil);

      // Muestra un mensaje de éxito y guarda el alumno en la base de datos
      console.info(`El alumno se creó correctamente con los datos: ${createdPupil}`);
      return await createdPupil.save();

    } catch (error) {
      // Muestra un mensaje con el error en caso de que esto ocurra
      throw new Error(`Ocurrio un error al crear el alumno: \n
        ${error}`);
    }
  }

  /**
   * Busca en la base de datos todos los alumnos existentes
   * @returns Devuelve una lista de todos los alumnos en formato JSON
   */
  async findAll(): Promise<Pupil[]> {
    return await this.pupilModel.find().exec();
  }

  /**
   * Busca en la base de datos el alumno que coincida con el parametro enviado
   * por el usuario
   * @param dni parametro de busqueda proporcionado por el usuario
   * @returns Devuelve el registro del alumno que coincida con el parametro de busqueda
   */
  async findOne(dni: string): Promise<Pupil> {
    // Crea una constante en la cual se guardará el registro buscado en la base de datos
    const existingPupil = await this.pupilModel.findOne({dni}).exec();

    // Evalúa si se encontró el registro buscado
    if(existingPupil){
      // En caso de encontrar el registro devuelve un mensaje de exito y el registro
      console.info(`Alumno con dni: ${dni} encontrado exitosamente.`);
      return existingPupil;
    } else {
      // Caso contrario devuelve un mensaje informando que la busqueda no tuvo exito
      console.info(`No se encontró el alumno con dni: ${dni} en la base de datos.`);
    }
  }

  /**
   * Actualiza los valores del alumno
   * Busca en la base de datos el registro del alumno que coincida con el parametro proporcionado
   * Evalúa si se encontró dicho registro y en caso de no encontrarlo lanza un error
   * Caso contrario se guarda el id del registro en una constante
   * Se usa los datos del DTO para actualizar el alumno
   * Se evalua si existen los valores en el registro y se actualizan en caso de existir
   * Se devuelve el alumno actualizado
   * @param dniToFind Parametro proporcionado por el usuario para la busqueda
   * @param updatePupilDto Datos necesario para actualizar el alumno
   * @returns Devuelve el alumno actualizado
   */
  async update(dniToFind: string, updatePupilDto: UpdatePupilDto) {

    // Guarda el registro buscado en la base de datos
    const existingPupil = await this.pupilModel.findOne({ dni: dniToFind }).exec();

    // Evalua si existen valores en la constante
    if (!existingPupil) {
      // Lanza un error si no se cumple la condición
      throw new Error(`Pupil with id: ${dniToFind} does not exists`);
    }

    // Guarda el id del registro en una constante
    const _id = existingPupil._id;
    // Utiliza los datos del DTO para luego actualizar el alumno
    const { name, surname, dni, section } = updatePupilDto;

    // Se evalua si existen los valores en el registro y luego se los actualiza
    if (name !== undefined) existingPupil.name = name;
    if (surname !== undefined) existingPupil.surname = surname;
    if (dni !== undefined) existingPupil.dni = dni;
    if (section !== undefined) existingPupil.section = section;

    // Devuelve el alumno con su registro actualizado
    return await this.pupilModel.findByIdAndUpdate(_id, existingPupil);
  }

  /**
   * Borra de la base de datos un alumno
   * Busca el alumno que coincida con el parametro dni
   * Evalúa si existe en la base de datos
   * Guarda el id del alumno en una constante en caso de existir
   * Borra el registro y manda un mensaje de éxito en la operación
   * Caso contrario envía un mensaje informando que no se encontró el registro
   * Devuelve los valores del alumno borrado
   * @param dni Parametro de busqueda para borrar el alumno
   * @returns Devuelve el registro que se acaba de borrar
   */
  async remove(dni: string): Promise<Pupil> {
    // Guarda los valores encontrados en la base de datos en una constante
    const pupilToDelete = await this.pupilModel.findOne({ dni }).exec();

    // Evalúa si se encontró el registro
    if (pupilToDelete) {
      // Guarda el id en una constante
      const _id = pupilToDelete._id;
      // Borra el registro buscandolo con el id antes guardado
      await this.pupilModel.findByIdAndDelete(_id).exec();
      // Envía un mensaje de éxito
      console.info(`El registro del alumno con dni: ${dni} se borró correctamente.`);
    } else {
      // Envía un mensaje de que no existe tal regístro
      console.warn("No se encontró el registro a remover.")
    }
    // Devuelve el alumno borrado
    return pupilToDelete;
  }
}