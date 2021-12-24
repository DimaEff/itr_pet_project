import { Module } from '@nestjs/common';
import { GoogleFilesService } from './google-files.service';

@Module({
  providers: [GoogleFilesService]
})
export class GoogleFilesModule {}
