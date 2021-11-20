import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { disconnect } from 'mongoose';


let mongo: MongoMemoryServer;

export const rootMongooseTestModule = (options: MongooseModuleOptions = {}) =>
    MongooseModule.forRootAsync({
        useFactory: async () => {
            mongo = await MongoMemoryServer.create();
            const uri = mongo.getUri();
            return {
                uri,
                ...options,
            };
        },
    });

export const closeMongoConnection = async () => {
    await disconnect();
    if (mongo) await mongo.stop();
};