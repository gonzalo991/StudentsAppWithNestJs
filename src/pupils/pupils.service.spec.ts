import { Test, TestingModule } from '@nestjs/testing';
import { PupilsService } from './pupils.service';

describe('PupilsService', () => {
  let service: PupilsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PupilsService],
    }).compile();

    service = module.get<PupilsService>(PupilsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
