import { InternalServerErrorException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { Logs } from "./logs.entity";

@EntityRepository(Logs)
export class LogsRepository extends Repository<Logs> {
	async saveLogToDB(url, client, user_id): Promise<void> {
		const log = this.create({ url, client, user_id });

		try {
			await this.save(log);
		} catch(error) {
			console.log(error);
			throw new InternalServerErrorException();
		}
	}
}
