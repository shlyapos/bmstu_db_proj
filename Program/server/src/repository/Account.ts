import { BaseStorage, IQueryParameters } from "../storage/BaseStorage";
import { BaseRepository, IRecord } from "./BaseRepository";

export interface IAccountRecord extends IRecord {
    id?: number,
    name: string,
    login: string,
    email: string,
    avatar: string,
    salt?: string,
    hash?: string,
    role: string
}

export class AccountRepository extends BaseRepository {
    constructor(currentStorage: BaseStorage) {
        super();

        this.table = 'account';
        this.storage = currentStorage;
    }

    public async takeAll(role: string): Promise<IAccountRecord[]> {
        return await this.storage.takeAll(this.table, role);
    }

    public async takeById(id: number, role: string): Promise<IAccountRecord> {
        const result = await this.storage.takeById(this.table, id, role);
        return result[0];
    }

    public async create(newData: IAccountRecord, role: string): Promise<any> {
        const queryParams: IQueryParameters = {
            column: '(name, login, email, avatar, salt, hash, role)',
            format: '($1, $2, $3, $4, $5, $6, $7)',
            values: [newData.name, newData.login, newData.email, newData.avatar, newData.salt, newData.hash, newData.role]
        };

        return await this.storage.create(this.table, queryParams, role);
    }

    // public async update(id: number, newData: IAccountRecord, role: string): Promise<any> {
    //     return await this.storage.update(this.table, id, newData, role);
    // }

    public async delete(id: number, role: string): Promise<any> {
        const queryParams: IQueryParameters = {
            format: 'id = $1',
            values: [id]
        }

        return await this.storage.delete(this.table, queryParams, role);
    }

    public async filterByLogin(login: string, role: string): Promise<IAccountRecord[]> {
        const queryParams: IQueryParameters = {
            format: 'login = $1',
            values: [login]
        };

        return await this.storage.filterByColumn(this.table, queryParams, role);
    }
}