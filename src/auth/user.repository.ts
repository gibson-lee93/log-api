import { EntityRepository, Repository } from "typeorm";
import { User } from "./user.entity";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import { ConflictException, InternalServerErrorException } from "@nestjs/common";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
	async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
		const { email, password } = authCredentialsDto;
		const user = this.create({ email, password });

		try {
			await this.save(user);
		} catch (error) {
			if(error.code === 'ER_DUP_ENTRY') { //duplicate email
				throw new ConflictException('Email already exists');
			} else {
				throw new InternalServerErrorException();
			}
		}
	}
}