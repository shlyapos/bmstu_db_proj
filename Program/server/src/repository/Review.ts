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

    public create(newData: IReviewTable): void {
        this.storage.create(this.table, newData);
    }

    public update(id: number, newData: IReviewTable): void {
        this.storage.update(this.table, id, newData);
    }

    public delete(id: number): void {
        this.storage.delete(this.table, id);
    }
};