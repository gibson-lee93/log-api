import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { LogsRepository } from './logs.repository';
import { S3Service } from './s3.service';

@Injectable()
export class LogsService {
	constructor (
		@InjectRepository(LogsRepository)
		private logsRepository: LogsRepository,
		private s3Service: S3Service,
	) {}

	async uploadLog(file, user: User): Promise<void> {
		let url = await this.s3Service.uploadFile(file);
		if(!url) {
			throw new InternalServerErrorException();
		}

		return await this.logsRepository.saveLogToDB(url, user.email, user.id);
	}
}
