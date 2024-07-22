import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PupilsService } from './pupils.service';
import { CreatePupilDto } from './dto/create-pupil.dto';
import { UpdatePupilDto } from './dto/update-pupil.dto';

@Controller('pupils')
export class PupilsController {
  constructor(private readonly pupilsService: PupilsService) {}

  @Post()
  create(@Body() createPupilDto: CreatePupilDto) {
    return this.pupilsService.create(createPupilDto);
  }

  @Get()
  findAll() {
    return this.pupilsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pupilsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePupilDto: UpdatePupilDto) {
    return this.pupilsService.update(+id, updatePupilDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pupilsService.remove(+id);
  }
}
