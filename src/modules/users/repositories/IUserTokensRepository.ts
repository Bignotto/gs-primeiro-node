import UserToken from '../infra/typeorm/entities/UserToken';

export default interface IUserTokenRepository {
    generate(uiser_id: string): Promise<UserToken>;
    findByToken(token: string): Promise<UserToken | undefined>;
}
