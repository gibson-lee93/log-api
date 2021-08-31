import { Injectable, InternalServerErrorException } from "@nestjs/common";
import * as AWS from "aws-sdk";

@Injectable()
export class S3Service {
	AWS_S3_BUCKET = "api-log-1";
	s3 = new AWS.S3({
		accessKeyId: "AKIASOXZIQNSGSVDRLFO",
		secretAccessKey: "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",
	});

	async uploadFile(file): Promise<String> {
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