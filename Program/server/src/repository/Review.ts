import { BaseStorage, IQueryParameters } from "../storage/BaseStorage";
import { BaseRepository, IRecord } from "./BaseRepository";

export interface IReviewRecord extends IRecord {
    id?: number,
    post_id: number,
    auth_id: number,
    review_data: string,
    public_date: string,
}

export class ReviewRepository extends BaseRepository {
    constructor(currentStorage: BaseStorage) {
        super();

        this.table = 'review';
        this.storage = currentStorage;
    }

    public async takeAll(role: string): Promise<IReviewRecord[]> {
        return await this.storage.takeAll(this.table, role);
    }

    public async takeById(id: number, role: string): Promise<IReviewRecord> {
        const result = await this.storage.takeById(this.table, id, role)
        return result[0];
    }

    public async create(newData: IReviewRecord, role: string): Promise<void> {
        const queryParams: IQueryParameters = {
            column: '(post_id, auth_id, review_data, public_date)',
            format: '($1, $2, $3, $4)',
            values: [newData.post_id, newData.auth_id, newData.review_data, newData.public_date]
        };

        await this.storage.create(this.table, queryParams, role);
    }

    public async delete(id: number, role: string): Promise<void> {
        const queryParams: IQueryParameters = {
            format: 'id = $1',
            values: [id]
        }

        return await this.storage.delete(this.table, queryParams, role);
    }

    public async filterByPostId(id: number, role: string): Promise<IReviewRecord[]> {
        const queryParams: IQueryParameters = {
            format: 'post_id = $1',
            values: [id]
        }

        return await this.storage.filterByColumn(this.table, queryParams, role);
    }

    public async deleteFKRecordsByPostId(postId: number, role: string) {
        const queryParams: IQueryParameters = {
            format: 'post_id = $1',
            values: [postId]
        };

        return await this.storage.delete(this.table, queryParams, role);
    }
};