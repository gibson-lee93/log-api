import { EntityRepository, Repository } from "typeorm";
import { User } from "./user.entity";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
	async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
		const { email, password } = authCredentialsDto;
		const user = this.create({ email, password });
		await this.save(user);
	}
}