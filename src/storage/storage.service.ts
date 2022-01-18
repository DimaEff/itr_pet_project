import {Bucket, Storage} from '@google-cloud/storage';
import {Injectable} from "@nestjs/common";
import {resolve} from 'path';
import {ConfigService} from "@nestjs/config";
import * as uuid from 'uuid';
import * as Buffer from "buffer";
import {fromBuffer} from 'file-type'

import {Image} from "./types";


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

    async save(files: Buffer[]): Promise<Image[]> {
        const images: Image[] = [];

        for (const f of files) {
            const {ext} = await fromBuffer(f);
            const filename = `${uuid.v4()}.${ext}`;
            const metadata = this.getFileMetadata(filename);

            const file = this.bucket.file(filename);
            const stream = file.createWriteStream();
            stream.on('finish', async () => {
                return await file.setMetadata(metadata);
            })
            stream.end(f);

            images.push(metadata);
        }

        return images;
    }

    async delete(fileNames: string[]): Promise<void> {
        await Promise.all(fileNames.map(f => this.bucket
            .file(f)
            .delete()
        ));
    }

    private getFileMetadata(filename: string): Image {
        return {
            path: `https://${this.bucketName}.storage.googleapis.com/${filename}`,
            filename: filename,
        }
    }
}
