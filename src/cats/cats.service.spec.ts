import { Test, TestingModule } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';

import { closeMongoConnection, rootMongooseTestModule } from '../test-utils/MongooseTestModule';
import { CatsService } from './cats.service';
import { Cat, CatSchema } from './schemas/cat.schema';
import { CreateCatDto } from './dto/create-cat.dto';


describe('CatsService', () => {
    let catsService: CatsService;

    beforeEach(async () => {
        const moduleRef: TestingModule = await Test.createTestingModule({
            imports: [
                rootMongooseTestModule(),
                MongooseModule.forFeature([{ name: 'Cat', schema: CatSchema }]),
            ],
            providers: [CatsService],
        }).compile();

        catsService = moduleRef.get<CatsService>(CatsService);
    });

    it('should be defined', () => {
        expect(catsService).toBeDefined();
    });

    const dto: CreateCatDto = {
        name: 'Sima',
        age: 8,
        breed: 'mongrel',
    };

    const returnedCatDocument = {
        ...dto,
        _id: expect.anything(),
        __v: expect.anything(),
    };

    it('should create a cat', async () => {
        const cat: Cat = await catsService.create(dto);
        expect(cat).toMatchObject(returnedCatDocument);
    });

    it('should return an array of cats', async () => {
        await catsService.create(dto);
        const cats: Cat[] = await catsService.findAll();

        expect(cats).toMatchObject([returnedCatDocument]);
    })

    afterAll(async () => {
        await closeMongoConnection();
    });
});

