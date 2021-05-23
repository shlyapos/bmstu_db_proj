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

    public create(newData: ITagTable): void {
        this.storage.create(this.table, newData);
    }

    public update(id: number, newData: ITagTable): void {
        this.storage.update(this.table, id, newData);
    }

    public delete(id: number): void {
        this.storage.delete(this.table, id);
    }
};