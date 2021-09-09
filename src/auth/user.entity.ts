import { Logs } from "src/logs/logs.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class auth_user {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ unique: true })
	email: string;

	@Column()
	password: string;

	@OneToMany(_type => Logs, logs => logs.user_id, { eager: true })
	logs: Logs[];
}