import { IsMimeType, IsNotEmpty } from "class-validator";

export class UploadLogDto {
	@IsNotEmpty()
	@IsMimeType()
	file: MimeType;
}