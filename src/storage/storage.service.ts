import {Storage, Bucket} from '@google-cloud/storage';
import {Injectable} from "@nestjs/common";
import {resolve} from 'path';
import {ConfigService} from "@nestjs/config";


@Injectable()
export class StorageService {
    private readonly bucketName;
    private readonly settingsFileName;

    private bucket: Bucket;

    constructor(private configService: ConfigService) {
        this.bucketName = configService.get('STORAGE_BUCKET_NAME');
        this.settingsFileName = configService.get('STORAGE_SETTINGS_FILE_NAME');

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
