import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Controller('auth')
export class AuthController {
	constructor (private authService: AuthService) {}

	@Post('/signup')
	signUp(@Body() authCredentialsDto: AuthCredentialsDto): Promise<void> {
		return this.authService.signUp(authCredentialsDto);
	}

	@Get('/validateEmail')
	validateEmail(@Query('key') query: string): Promise<string> {
		return this.authService.validateEmail(query);
	}

	@Post('/signin')
	signIn(
		@Body() authCredentialsDto: AuthCredentialsDto
		): Promise<{ accessToken: string }> {
		return this.authService.signIn(authCredentialsDto);
	}
}
