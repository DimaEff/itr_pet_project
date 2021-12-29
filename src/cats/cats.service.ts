import {Model} from 'mongoose';
import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';

import {Cat, CatDocument} from './schemas/cat.schema';
import {CreateCatDto} from './dto/create-cat.dto';


@Injectable()
export class CatsService {
    constructor(@InjectModel(Cat.name) private catModel: Model<CatDocument>) {
    }

    async create(dto: CreateCatDto): Promise<Cat> {
        return this.catModel.create(dto);
    }

    async findAll(): Promise<Cat[]> {
        return this.catModel.find();
    }
}
