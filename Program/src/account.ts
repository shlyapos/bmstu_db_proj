import { BaseRepository } from './repository'
import { SqlStorage } from './storage'

export class SqlAccountRepository extends BaseRepository {
    constructor() {
        super();
        this.storage = new SqlStorage();
    }

    public takeAll(): boolean {
        try {
            this.storage.takeAll('account');
            return true;
        }
        catch (error) {
            return false;
        }
    }

    public takeById(tableName: string, id: number): boolean {
        try {
            this.storage.takeById(tableName, id);
            return true;
        }
        catch (error) {
            return false;
        }
    }
};