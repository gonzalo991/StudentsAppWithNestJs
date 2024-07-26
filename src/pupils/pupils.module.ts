import { Module } from '@nestjs/common';
import { PupilsService } from './pupils.service';
import { PupilsController } from './pupils.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Pupil, PupilSchema } from './schemas/pupils.schema';
import { PupilFactoryImpl } from './schemas/factories/pupil.factory';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Pupil.name, schema: PupilSchema }])
  ],
  controllers: [PupilsController],
  providers: [PupilsService,
    { provide: 'PupilFactory', useClass: PupilFactoryImpl }
  ],
})

export class PupilsModule { }
