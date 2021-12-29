import {Storage, Bucket} from '@google-cloud/storage';
import {Injectable} from "@nestjs/common";


@Injectable()
export class GoogleFilesService {
    private storage: Storage;
    private readonly bucketName: string;
    private bucket: Bucket;

    constructor() {
        this.storage = new Storage({keyFilename: 'src/google-files/int-map-334413-57e13c359441.json'});
        this.bucketName = 'int-map-storage';
        this.bucket = this.storage.bucket(this.bucketName);
    }

    async delete(fileNames: string[]) {
        const promises = await Promise.all(fileNames.map(f => this.bucket
            .file(f)
            .delete()
        ));
        return {promises, status: 1};
    }
}
