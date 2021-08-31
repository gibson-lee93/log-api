import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LogsRepository } from './logs.repository';
import { S3Service } from './s3.service';

@Injectable()
export class LogsService {
	constructor (
		@InjectRepository(LogsRepository)
		private logsRepository: LogsRepository,
		private s3Service: S3Service,
	) {}

	async uploadLog(file): Promise<void> {
		await this.s3Service.uploadFile(file);
	}
}
