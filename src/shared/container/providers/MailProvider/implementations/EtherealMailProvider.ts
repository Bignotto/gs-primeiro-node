import IMailProvider from '../models/IMailProvider';
import nodemailer, { Transporter } from 'nodemailer';

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

    public async sendMail(to: string, body: string): Promise<void> {
        const message = await this.client.sendMail({
            from: 'GoBarber App<gobarber@gobarber.com>',
            to,
            subject: 'Recupere sua senha',
            text: body,
            html: `<p>${body}</p>`,
        });
        console.log('Message sent: %s', message.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
    }
}
