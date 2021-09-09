import { Controller, ForbiddenException, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { GetUser } from 'src/auth/get-user.decorator';
import { auth_user } from 'src/auth/user.entity';
import { LogsService } from './logs.service';

@Controller('logs')
@UseGuards(AuthGuard())
export class LogsController {
	constructor (private logsService: LogsService) {}

	@Post()
	@UseInterceptors(FileInterceptor('file'))
	uploadLog(
		@UploadedFile() file,
		@GetUser() user: auth_user,
	): Promise<void> {
		if(!file) {
			throw new ForbiddenException("No file was given to the server");
		}
		return this.logsService.uploadLog(file, user);
	}
}
