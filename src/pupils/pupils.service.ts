import { Injectable } from '@nestjs/common';
import { CreatePupilDto } from './dto/create-pupil.dto';
import { UpdatePupilDto } from './dto/update-pupil.dto';

@Injectable()
export class PupilsService {
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
