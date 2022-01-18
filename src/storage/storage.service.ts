import {Bucket, Storage} from '@google-cloud/storage';
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

    async create(files: File[]): Promise<any> {
        // console.log(this.req);
        // multer({storage: googleStorage}).array()
        // const uploadedFilesPromises = files.map(async file => {
        //     const fileExt = extname(file.name);
        //     const fileName = `${uuid.v4()}${fileExt}`;
        //     const f = this.bucket.file(fileName);
        //     const arrayBuffer = await file.arrayBuffer();
        //     const buffer = Buffer.from(arrayBuffer);
        //     return f.save(buffer);
        // });

        // return await Promise.all(uploadedFilesPromises);
    }

    async delete(fileNames: string[]): Promise<void> {
        await Promise.all(fileNames.map(f => this.bucket
            .file(f)
            .delete()
        ));
    }
}
