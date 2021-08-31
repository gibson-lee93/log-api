import { type } from "os";
import { User } from "src/auth/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Logs {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column("varchar", { length: 20})
	client: string;

	@Column("varchar", { length: 255})
	url: string;

	@Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
	create_time: Date;

	@ManyToOne(_type => User, user => user.logs, { eager: false })
	user_id: User;
}