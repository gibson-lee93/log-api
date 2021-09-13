import { EntityRepository, Repository } from "typeorm";
import { auth_user } from "./user.entity";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import { ConflictException, InternalServerErrorException } from "@nestjs/common";
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
}