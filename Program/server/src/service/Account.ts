import * as crypto from 'crypto';

import { AccountRepository, IAccountRecord } from '../repository/Account';
import { BaseStorage } from '../storage/BaseStorage';

export default class AccountService {
    private saltLength: number = 6;
    private repository: AccountRepository;

    constructor(currentStorage: BaseStorage) {
        this.repository = new AccountRepository(currentStorage);
    }

    public async takeRecordsAll(role: string): Promise<any> {
        return await this.repository.takeAll(role);
    }

    public async takeRecordById(id: number, role: string): Promise<any> {
        let user = await this.repository.takeById(id, role);

        delete user.salt;
        delete user.hash;

        return user;
    }

    public async checkUser(data: any, role: string): Promise<any> {
        let user = (await this.repository.filterByLogin(data.login, role))[0]; // returns array of users, but need 1st record

        if (!user || !(user.hash === this.hashPassword(data.password, user.salt)))
            throw new Error('Wrong login or password');

        delete user.salt;
        delete user.hash;

        return user;
    }

    public async addUser(data: any, role: string): Promise<any> {
        if (!this.checkEmail(data.email))
            throw new Error('Wrong email format');

        const salt = this.generateSalt(this.saltLength);
        const hash = this.hashPassword(data.password, salt);

        const newUser: IAccountRecord = {
            name: data.name,
            login: data.login,
            email: data.email,
            avatar: data.avatar,
            salt: salt,
            hash: hash,
            role: data.role
        };

        await this.repository.create(newUser, role).catch(error => { throw error });
        return { login: data.login, password: data.password };
    }

    public async updateRecord(id: number, data: any, role: string): Promise<any> {
        this.repository.update(id, data, role);
    }

    public async deleteRecord(id: number, role: string): Promise<any> {
        this.repository.delete(id, role);
    }

    public async authCheck(data: any, role: string): Promise<any> {
        await this.repository.takeById(data.id, role)
            .then(result => {
                if (result.hash === this.hashPassword(data.password, result.salt)) {
                    return result;
                }
            })
            .catch(error => {
                throw error;
            });
    }


    // Private methods for validations
    private hashPassword(password: string, salt: string): string {
        let hash = crypto.createHmac('sha512', salt);
        hash.update(password);

        return hash.digest('hex');
    }

    private generateSalt(length: number): string {
        return crypto.randomBytes(Math.ceil(length / 2))
            .toString('hex')
            .slice(0, length)
    }

    private checkEmail(email: string) {
        const regularEmail = /^[\w]{1}[\w-\.]*@[\w-]+\.[a-z]{2,4}$/i;
        return email.match(regularEmail);
    }
};
