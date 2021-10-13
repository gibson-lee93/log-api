import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
import { TemplateService } from '../template/template.service';
import { auth_user } from './user.entity';

@Injectable()
export class AuthService {
	constructor (
		@InjectRepository(UserRepository)
		private userRepository: UserRepository,
		private jwtService: JwtService,
		private templateService: TemplateService
	) {}

	async getUser(user: auth_user) {
		delete user.password;
		delete user.is_admin;
		delete user.is_deleted;
		delete user.is_verified;
		delete user.last_login;
		delete user.fcm_token;
		delete user.login_fail;

		let interests = [];
		let benefits = [];

		if (user.interests) {
			interests = user.interests.split(',').map((data) => {
				return { code: data }
			})
			delete user.interests;
		}

    if (user.benefits) {
      benefits = user.benefits.split(',').map((data) => {
        return { code: data }
      })
			delete user.benefits;
    }
		
		return {"auth_profile_get_result": {
			...user,
			"interests": interests,
			"benefits": benefits
			}
		};
	}

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
