import IParseMailTemplateDTO from '../dtos/IParseMailTemplateDTO';
import IMailTemplateProvider from '../models/IMailTemplateProvider';

class FakeMailTemplateProvider implements IMailTemplateProvider {
    public async parse({
        file,
        variables,
    }: IParseMailTemplateDTO): Promise<string> {
        return Promise.resolve(`Este é um mail template teste: ${file}`);
    }
}

export default FakeMailTemplateProvider;
