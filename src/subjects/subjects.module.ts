import { Module } from '@nestjs/common';
import { SubjectsService } from './subjects.service';
import { SubjectsController } from './subjects.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Subject, SubjectSchema } from './schemas/subject.schema';
import { SubjectFactoryImpl } from './schemas/factories/subject.factory';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Subject.name, schema: SubjectSchema }])
  ],
  controllers: [SubjectsController],
  providers: [SubjectsService,
    { provide: 'SubjectFactory', useClass: SubjectFactoryImpl }
  ],
})

export class SubjectsModule {}