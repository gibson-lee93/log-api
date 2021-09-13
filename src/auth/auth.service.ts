import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
import { TemplateService } from '../template/template.service';

@Injectable()
export class AuthService {
	constructor (
		@InjectRepository(UserRepository)
		private userRepository: UserRepository,
		private jwtService: JwtService,
		private templateService: TemplateService
	) {}

	async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
		const user = await this.userRepository.createUser(authCredentialsDto);
		await this.templateService.sendMailForSignup(user.id, user.username, 'signup', 'ko');
	}

	async validateEmail(query: string): Promise<string> {
		return this.userRepository.validateEmail(query);
	}

	async signIn(authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
		const { username, password } = authCredentialsDto;
		const user = await this.userRepository.findOne({ username });
		
		if(user && (await bcrypt.compare(password, user.password))) {
			const payload: JwtPayload = { username };
			const accessToken: string = await this.jwtService.sign(payload);
			return { accessToken };
		} else {
			throw new UnauthorizedException('Please check your login credentials');
		}
	}
}
