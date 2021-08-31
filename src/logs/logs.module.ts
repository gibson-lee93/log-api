import { Module } from '@nestjs/common';
import { LogsService } from './logs.service';
import { LogsController } from './logs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogsRepository } from './logs.repository';
import { S3Service } from './s3.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([LogsRepository]),
    AuthModule,
  ],
  providers: [LogsService, S3Service],
  controllers: [LogsController]
})
export class LogsModule {}
