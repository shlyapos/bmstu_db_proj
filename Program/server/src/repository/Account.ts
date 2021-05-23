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

    public async takeAll(): Promise<boolean> {
        await this.storage.takeAll(this.table).then(
            result => console.log(result),
            error => console.error(error)
        );
        return true;
    }

    public async takeById(id: number): Promise<boolean> {
        await this.storage.takeById(this.table, id).then(
            result => console.log(result),
            error => console.error(error)
        );
        return true;
    }

    public create(newData: IAccountTable): void {
        this.storage.create(this.table, newData);
    }

    public update(id: number, newData: IAccountTable): void {
        this.storage.update(this.table, id, newData);
    }

    public delete(id: number): void {
        this.storage.delete(this.table, id);
    }
}