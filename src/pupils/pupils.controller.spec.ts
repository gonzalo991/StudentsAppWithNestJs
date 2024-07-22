import { Test, TestingModule } from '@nestjs/testing';
import { PupilsController } from './pupils.controller';
import { PupilsService } from './pupils.service';

describe('PupilsController', () => {
  let controller: PupilsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PupilsController],
      providers: [PupilsService],
    }).compile();

    controller = module.get<PupilsController>(PupilsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
