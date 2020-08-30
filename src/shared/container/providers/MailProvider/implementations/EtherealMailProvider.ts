import IMailProvider from '../models/IMailProvider';
import nodemailer, { Transporter } from 'nodemailer';
import ISendMailDTO from '../dtos/ISendMailDTO';

export default class EtherealMailProvider implements IMailProvider {
    private client: Transporter;

    constructor() {
        const account = nodemailer.createTestAccount().then(account => {
            const transporter = nodemailer.createTransport({
                host: account.smtp.host,
                port: account.smtp.port,
                secure: account.smtp.secure,
                auth: {
                    user: account.user,
                    pass: account.pass,
                },
            });
            this.client = transporter;
        });
    }

    public async sendMail({
        to,
        from,
        subject,
        templateData,
    }: ISendMailDTO): Promise<void> {
        const message = await this.client.sendMail({
            from: {
                name: from?.name || 'GoBarber App',
                address: from?.email || 'gobarber@gobarber.com',
            },
            to: { name: to.name, address: to.email },
            subject: 'Recupere sua senha',
            html: `<p>TEMPLATE</p>`,
        });
        console.log('Message sent: %s', message.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
    }
}
