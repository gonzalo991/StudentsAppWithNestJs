import { Module } from '@nestjs/common';
import { PupilsService } from './pupils.service';
import { PupilsController } from './pupils.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Pupil, PupilSchema } from './schemas/pupils.schema';
import { Subject, SubjectSchema } from './schemas/subject.schema';
import { PupilFactoryImpl } from './schemas/factories/pupil.factory';
import { SubjectFactoryImpl } from './schemas/factories/subject.factory';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Pupil.name, schema: PupilSchema }]),
    MongooseModule.forFeature([{ name: Subject.name, schema: SubjectSchema }]),
  ],
  controllers: [PupilsController],
  providers: [PupilsService,
    { provide: 'PupilFactory', useClass: PupilFactoryImpl },
    { provide: 'SubjectFactory', useClass: SubjectFactoryImpl},
  ],
})

export class PupilsModule { }
