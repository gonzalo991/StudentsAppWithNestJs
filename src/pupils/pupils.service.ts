import { Injectable } from '@nestjs/common';
import { CreatePupilDto } from './dto/create-pupil.dto';
import { UpdatePupilDto } from './dto/update-pupil.dto';
import { PupilFactory } from './schemas/factories/pupil_factory.interface';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PupilsService {

  constructor(
    @Inject('PupilFactory') private readonly pupilFactorty: PupilFactory,
  ){}

  create(createPupilDto: CreatePupilDto) {
    return 'This action adds a new pupil';
  }

  findAll() {
    return `This action returns all pupils`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pupil`;
  }

  update(id: number, updatePupilDto: UpdatePupilDto) {
    return `This action updates a #${id} pupil`;
  }

  remove(id: number) {
    return `This action removes a #${id} pupil`;
  }
}
