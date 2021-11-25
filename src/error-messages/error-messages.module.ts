import { Module } from '@nestjs/common';

import { ErrorMessagesService } from './error-messages.service';


@Module({
  providers: [ErrorMessagesService],
  exports: [ErrorMessagesService],
})
export class ErrorMessagesModule {}
