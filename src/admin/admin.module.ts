import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { UsersModule } from '../users/users.module';
import { RolesModule } from '../roles/roles.module';


@Module({
  imports: [
      UsersModule,
      RolesModule,
  ],
  controllers: [AdminController]
})
export class AdminModule {}
