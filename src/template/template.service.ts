import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TemplateRepository } from './template.repository';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class TemplateService {
	constructor (
		@InjectRepository(TemplateRepository)
		private templateRepository: TemplateRepository,
		private configService: ConfigService,
		private mailerService: MailerService,
	) {}

	async sendMailForSignup(
		id: number,
		to: string,
		type: string,
		language: string,
	): Promise<void> {
		const salt = await bcrypt.genSalt();
		const secretKey = id + await bcrypt.hash(to, salt);
		const link = this.configService.get('API_ENDPOINT') + '/auth/validateEmail?key=' + secretKey;

		const template = await this.templateRepository.findOne({ type, language });
		if(!template) {
			throw new InternalServerErrorException("No template found");
		}
		
		const text = template.template.replace('__link_button__', `<a href="${link}">Click here</a>`);
		await this.sendMail(to, template.subject, text);
	}

	async sendMail(
		to: string,
		subject: string,
		text: string,
	): Promise<void> {
		try {
			await this.mailerService.sendMail({
				to: to,
				subject: subject,
				html: text,
			})
		} catch(error) {
			console.log(error);
			throw new InternalServerErrorException();
		}
		
	}
} 
