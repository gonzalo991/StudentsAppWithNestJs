import { PartialType } from '@nestjs/mapped-types';
import { CreatePupilDto } from './create-pupil.dto';

export class UpdatePupilDto extends PartialType(CreatePupilDto) {
}
