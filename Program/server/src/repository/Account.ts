import { BaseStorage } from "src/storage/BaseStorage";
import { BaseRepository } from "./BaseRepository";

interface IAccountTable {
    id: number,
    name: string,
    login: string,
    email: string,
    avatar: string,
    salt: string,
    hash: string
}

export class AccountRepository extends BaseRepository {
    constructor(currentStorage: BaseStorage) {
        super();

        this.table = 'account';
        this.storage = currentStorage;
    }

    public async takeAll(): Promise<any> {
        return await this.storage.takeAll(this.table);
    }

    public async takeById(id: number): Promise<any> {
        return await this.storage.takeById(this.table, id);
    }

    public async create(newData: IAccountTable): Promise<any> {
        return await this.storage.create(this.table, newData);
    }

    public async update(id: number, newData: IAccountTable): Promise<any> {
        return await this.storage.update(this.table, id, newData);
    }

    public async delete(id: number): Promise<any> {
        return await this.storage.delete(this.table, id);
    }
}