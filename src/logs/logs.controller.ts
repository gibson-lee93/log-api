import { Body, Controller, Post, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { LogsService } from './logs.service';

@Controller('logs')
@UseGuards(AuthGuard())
export class LogsController {
	constructor (private logsService: LogsService) {}

	@Post()
	@UseInterceptors(FileInterceptor('file'))
	uploadLog(@UploadedFile() file): Promise<void> {
		console.log(file);
		return this.logsService.uploadLog(file);
	}
}
