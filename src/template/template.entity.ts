import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Template {
	@PrimaryGeneratedColumn({ unsigned: true })
	id: number;

	@Column({ type: "varchar", length: 20, nullable: true })
	type: string;

	@Column({ type: "text", nullable: true })
	template: string;

	@Column({ type: "varchar", length: 5, nullable: true })
	language: string;

	@Column({ type: "varchar", length: 200, nullable: true })
	subject: string;
}