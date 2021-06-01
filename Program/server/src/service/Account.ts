import * as crypto from 'crypto';

import AccountRepository from '../repository/Account';
import { BaseStorage } from '../storage/BaseStorage';

export default class AccountService {
    private saltLength: number = 6;
    private repository: AccountRepository;

    constructor(currentStorage: BaseStorage) {
        this.repository = new AccountRepository(currentStorage);
    }

    public async takeRecordsAll(): Promise<any> {
        return await this.repository.takeAll();
    }

    public async takeRecordById(id: number): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.repository.takeById(id)
                .then(result => {
                    let user = result[0];

                    delete user.salt;
                    delete user.hash;

                    resolve(user);
                })
                .catch(error => reject(error));
        })
    }

    public async checkUser(data: any): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.repository.filterByLogin(data.login)
                .then(result => {
                    const user = result[0];

                    console.log("\n", user.hash, "\n");
                    console.log(this.hashPassword(data.password, user.salt), "\n");

                    if (!(user.hash === this.hashPassword(data.password, user.salt)))
                        throw new Error('Wrong login or password');

                    delete user.salt;
                    delete user.hash;

                    resolve(user);
                })
                .catch(error => reject(error));
        })
    }

    public async addUser(data: any): Promise<void> {
        if (!this.checkEmail(data.email))
            throw new Error('Wrong email format');

        const salt = this.generateSalt(this.saltLength);
        const hash = this.hashPassword(data.password, salt);

        await this.repository.create({
            name: data.name,
            login: data.login,
            email: data.email,
            avatar: data.avatar,
            salt: salt,
            hash: hash
        })
            .catch(error => { throw error });
    }

    public async updateRecord(id: number, data: any): Promise<any> {
        this.repository.update(id, data);
    }

    public async deleteRecord(id: number): Promise<any> {
        this.repository.delete(id);
    }

    public async authCheck(data: any): Promise<any> {
        await this.repository.takeById(data.id)
            .then(result => {
                if (result.hash === this.hashPassword(data.password, result.salt)) {
                    return result;
                }
            })
            .catch(error => {
                throw error;
            });
    }

    public async signinVerification(login: string): Promise<any> {
        await this.repository.takeAll()
            .then(
                result => {
                    console.log(result);
                }
            )
            .catch(error => { throw error });
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

    private takeUserFromTableByLogin(table: any, login: string) {
        let result = null;

        for (const record of table) {
            if (record.login === login) {
                result = record;
                break;
            }
        }

        return result;
    }
};
