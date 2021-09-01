import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as AWS from "aws-sdk";

@Injectable()
export class S3Service {
	constructor(
		private configService: ConfigService
	) {}
	
	AWS_S3_BUCKET = this.configService.get('AWS_S3_BUCKET');
	s3 = new AWS.S3({
		accessKeyId: this.configService.get('ACCESS_KEY_ID'),
		secretAccessKey: this.configService.get('SECRET_ACCESS_KEY'),
	});

	async uploadFile(file): Promise<String> {
		console.log(this.AWS_S3_BUCKET);
		const { originalname } = file;
		return await this.s3Upload(file.buffer, this.AWS_S3_BUCKET, originalname, file.mimetype);
	}

	async s3Upload(file, bucket, name, mimetype): Promise<String> {
		const params = {
			Bucket: bucket,
			Key: 'logs/'+`${name}_${Date.now().toString()}`,
			Body: file,
			ACL: "public-read",
			ContentType: mimetype,
		};

		try{
			let s3Response = await this.s3.upload(params).promise();
			return s3Response.Location;
		} catch(error) {
			console.log(error);
			throw new InternalServerErrorException();
		}
	}
}