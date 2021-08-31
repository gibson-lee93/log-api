import { Injectable, InternalServerErrorException } from "@nestjs/common";
import * as AWS from "aws-sdk";

@Injectable()
export class S3Service {
	AWS_S3_BUCKET = "api-log-1";
	s3 = new AWS.S3({
		accessKeyId: "AKIASOXZIQNSGSVDRLFO",
		secretAccessKey: "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",
	});

	async uploadFile(file) {
		const { originalname } = file;
		await this.s3Upload(file.buffer, this.AWS_S3_BUCKET, originalname, file.mimetype);
	}

	async s3Upload(file, bucket, name, mimetype) {
		const params = {
			Bucket: bucket,
			Key: String(name),
			Body: file,
			ACL: "public-read",
			ContentType: mimetype,
			ContentDisposition: "inline",
		};

		try{
			let s3Response = await this.s3.upload(params).promise();
			return s3Response;
		} catch(error) {
			console.log(error);
			throw new InternalServerErrorException();
		}
	}
}