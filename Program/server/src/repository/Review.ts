import { BaseStorage } from "src/storage/BaseStorage";
import { BaseRepository } from "./BaseRepository";

interface IReviewTable {
    id: number,
    postId: number,
    authorId: number,
    reviewData: string,
    publicDate: string,
}

export class ReviewRepository extends BaseRepository {
    constructor(currentStorage: BaseStorage) {
        super();

        this.table = 'review';
        this.storage = currentStorage;
    }

    public async takeAll(): Promise<any> {
        return await this.storage.takeAll(this.table);
    }

    public async takeById(id: number): Promise<any> {
        return await this.storage.takeById(this.table, id);
    }

    public async create(newData: IReviewTable): Promise<any> {
        return await this.storage.create(this.table, newData);
    }

    public async update(id: number, newData: IReviewTable): Promise<any> {
        return await this.storage.update(this.table, id, newData);
    }

    public async delete(id: number): Promise<any> {
        return await this.storage.delete(this.table, id);
    }
};