import { 
	ConflictException, 
	InternalServerErrorException, 
	NotFoundException,
} from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { auth_user } from "./user.entity";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import * as bcrypt from 'bcrypt';

@EntityRepository(auth_user)
export class UserRepository extends Repository<auth_user> {
	async createUser(authCredentialsDto: AuthCredentialsDto): Promise<auth_user> {
		const { username, password, fcmToken } = authCredentialsDto;
		let { timeZone } = authCredentialsDto;

		const salt = await bcrypt.genSalt();
		const hashedPassword = await bcrypt.hash(password, salt);

		if(!timeZone || !timeZone.match(/^-?[0-9]{2}:[0-9]{2}:[0-9]{2}$/)) {
			timeZone = '09:00:00';
		}

		const user = this.create({ 
			username, 
			password: hashedPassword,
			fcm_token: fcmToken,
			time_zone: timeZone,
		});

		try {
			const result = await this.save(user);
			return result;
		} catch (error) {
			if(error.code === 'ER_DUP_ENTRY') { //duplicate username
				throw new ConflictException('User already exists');
			} else {
				console.log(error);
				throw new InternalServerErrorException();
			}
		}
	}

	async validateEmail(query: string): Promise<string> {
		const userId = Number(query.slice(0, 1));
		
		const user = await this.findOne({ id: userId });
		if(!user) {
			throw new NotFoundException('User not found');
		}

		user.is_verified = 1;
		try {
			await this.save(user);
			return 'Validation Successful';
		} catch(error) {
			console.log(error);
			throw new InternalServerErrorException();
		}
	}
}