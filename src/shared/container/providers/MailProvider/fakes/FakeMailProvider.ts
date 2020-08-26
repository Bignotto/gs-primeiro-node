import IEmailProvider from '../models/IEmailProvider';

interface Message {
    to: string;
    body: string;
}

export default class FakeMailProvider implements IEmailProvider {
    private messages: Message[] = [];

    public async sendMail(to: string, body: string): Promise<void> {
        this.messages.push({
            to,
            body,
        });
    }
}
