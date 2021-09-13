import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class AuthCredentialsDto {
	@IsNotEmpty()
	@IsString()
	username: string;

	@IsNotEmpty()
	@IsString()
	password: string;

	@IsOptional()
	@IsString()
	timeZone: string;

	@IsNotEmpty()
	@IsString()
	fcmToken: string;
}