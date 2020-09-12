import IMailProvider from '../models/IMailProvider';
import nodemailer, { Transporter } from 'nodemailer';
import ISendMailDTO from '../dtos/ISendMailDTO';
import IMailTemplateProvider from '../../MailTemplateProvider/models/IMailTemplateProvider';
import { injectable, inject } from 'tsyringe';
import aws from 'aws-sdk';
import mailConfig from '@config/mail';

@injectable()
export default class SesMailProvider implements IMailProvider {
    private client: Transporter;

    constructor(
        @inject('MailTemplateProvider')
        private mailTemplateProvider: IMailTemplateProvider,
    ) {
        this.client = nodemailer.createTransport({
            SES: new aws.SES({
                apiVersion: '2010-12-01',
                region: 'sa-east-1',
            }),
        });
    }

    public async sendMail({
        to,
        from,
        subject,
        templateData,
    }: ISendMailDTO): Promise<void> {
        const { email, name } = mailConfig.defaults.from;

        await this.client.sendMail({
            from: {
                name: from?.name || name,
                address: from?.email || email,
            },
            to: { name: to.name, address: to.email },
            subject,
            html: await this.mailTemplateProvider.parse(templateData),
        });
        console.log('YEAH MAIL SES!');
    }
}
