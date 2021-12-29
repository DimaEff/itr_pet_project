import {Storage, Bucket} from '@google-cloud/storage';
import {Injectable} from "@nestjs/common";
import {resolve} from 'path';


@Injectable()
export class StorageService {
    private readonly bucketName = 'int-map-storage';
    private readonly settingsFileName = 'int-map-334413-57e13c359441.json';

    private bucket: Bucket;

    constructor() {
        const settingsFilePath = resolve(__dirname, this.settingsFileName);
        const storage = new Storage({
            keyFilename: settingsFilePath,
        });

        this.bucket = storage.bucket(this.bucketName);
    }

    async delete(fileNames: string[]): Promise<void> {
        await Promise.all(fileNames.map(f => this.bucket
            .file(f)
            .delete()
        ));
    }
}
