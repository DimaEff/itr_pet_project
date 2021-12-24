import { Test, TestingModule } from '@nestjs/testing';
import { GoogleFilesService } from './google-files.service';

describe('GoogleFilesService', () => {
  let service: GoogleFilesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GoogleFilesService],
    }).compile();

    service = module.get<GoogleFilesService>(GoogleFilesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
