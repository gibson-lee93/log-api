import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { GetUser } from './get-user.decorator';
import { auth_user } from './user.entity';

@Controller('auth')
export class AuthController {
	constructor (private authService: AuthService) {}

	@UseGuards(AuthGuard())
	@Get('/profile_get')
	getUser(@GetUser() user: auth_user) {
		return this.authService.getUser(user);
	}

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
