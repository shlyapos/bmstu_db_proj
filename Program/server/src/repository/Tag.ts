import { BaseStorage } from "src/storage/BaseStorage";
import { BaseRepository } from "./BaseRepository";

interface ITagTable {
    id: number,
    name: string
}

export class TagRepository extends BaseRepository {
    constructor(currentStorage: BaseStorage) {
        super();

        this.table = 'tag';
        this.storage = currentStorage;
    }

    public async takeAll(): Promise<any> {
        return await this.storage.takeAll(this.table);
    }

    public async takeById(id: number): Promise<any> {
        return await this.storage.takeById(this.table, id);
    }

    public async create(newData: ITagTable): Promise<any> {
        return await this.storage.create(this.table, newData);
    }

    public async update(id: number, newData: ITagTable): Promise<any> {
        return await this.storage.update(this.table, id, newData);
    }

    public async delete(id: number): Promise<any> {
        return await this.storage.delete(this.table, id);
    }
};