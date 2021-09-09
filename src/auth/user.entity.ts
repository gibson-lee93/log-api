import { time } from "aws-sdk/clients/frauddetector";
import { Logs } from "src/logs/logs.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class auth_user {
	@PrimaryGeneratedColumn({ unsigned: true })
	id: number;

	@Column({ type: "varchar", length: 150, unique: true })
	username: string;

	@Column({ type: "varchar", length: 300 })
	password: string;

	@Column({ type: "varchar", length: 150, default: () => "'ZEREMA'" })
	nickname: string;

	@Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
	date_joined: Date;

	@Column({ type: "tinyint", width: 1, default: () => 0 })
	is_verified: number;

	@Column({ type: "tinyint", width: 1, default: () => 0 })
	is_admin: number;

	@Column({ type: "datetime" }) //when signUp, add '0000-00-00 00:00:00' as default value
	last_login: Date;

	@Column({ type: "varchar", length: 255, default: () => "''" })
	fcm_token: string;

	@Column({ type: "tinyint", width: 1, default: () => 0 })
	login_fail: number;

	@Column({ type: "tinyint", width: 1, nullable: true })
	sex: number;

	@Column({ type: "date", nullable: true })
	birth: Date;

	@Column({ type: "smallint", width: 3, nullable: true })
	height: number;

	@Column({ type: "smallint", width: 3, nullable: true })
	weight: number;

	@Column({ type: "tinyint", width: 1, default: () => 0 })
	heightUnit: number;

	@Column({ type: "tinyint", width: 1, default: () => 0 })
	weightUnit: number;

	@Column({ type: "time", default: () => "'09:00:00'" })
	time_zone: time;

	@Column({ type: "smallint", width: 6, default: () => 0 })
	achieve_goal_num: number;

	@Column({ type: "varchar", length: 5, nullable: true })
	language: string;

	@Column({ type: "varchar", length: 10, nullable: true })
	client: string;

	@Column({ type: "varchar", length: 10, nullable: true })
	version_name: string;

	@Column({ type: "varchar", length: 300, nullable: true })
	interests: string;

	@Column({ type: "varchar", length: 100, nullable: true })
	posture: string;

	@Column({ type: "int", width: 11, nullable: true })
	sleep_avg_minutes: number;

	@Column({ type: "time", nullable: true })
	lie_down: time;

	@Column({ type: "time", nullable: true })
	stand_up: time;

	@Column({ type: "varchar", length: 300, nullable: true })
	benefits: string;

	@Column({ type: "text", nullable: true })
	remark: string;

	@Column({ type: "tinyint", width: 1, default: () => 0 })
	is_deleted: number;

	@Column({ type: "varchar", length: 10, default: () => "'user'" })
	role: string;

	@OneToMany(_type => Logs, logs => logs.user_id, { eager: true })
	logs: Logs[];
}