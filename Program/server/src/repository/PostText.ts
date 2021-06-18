import { BaseStorage, IQueryParameters } from "../storage/BaseStorage";
import { BaseRepository, IRecord } from "./BaseRepository";

export interface IPostTextRecord extends IRecord {
    data: string,
    post_id?: number,
    text_id?: number
};

export class PostTextRepository extends BaseRepository {
    constructor(currentStorage: BaseStorage) {
        super();

        this.table = 'post_text';
        this.storage = currentStorage;
    }

    public async takeAll(role: string): Promise<IPostTextRecord[]> {
        return await this.storage.takeAll(this.table, role);
    }

    public async takeById(id: number, role: string): Promise<IPostTextRecord> {
        const result = await this.storage.takeById(this.table, id, role);
        return result[0];
    }

    public async create(newData: IPostTextRecord, role: string): Promise<any> {
        const queryParams: IQueryParameters = {
            column: '(data)',
            format: '($1)',
            values: [newData.data]
        }

        return await this.storage.create(this.table, queryParams, role);
    }

    public async delete(id: number, role: string): Promise<any> {
        const queryParams: IQueryParameters = {
            format: 'id = $1',
            values: [id]
        }

        return await this.storage.delete(this.table, queryParams, role);
    }

    public async takeByPostId(postId: number, role: string): Promise<IPostTextRecord[]> {
        const queryParams: IQueryParameters = {
            column: this.table + '.id = text_to_post.text_id',
            format: 'WHERE text_to_post.post_id = $1',
            values: [postId]
        };

        return await this.storage.joinTables(this.table, 'text_to_post', queryParams, role);
    }

    public async deleteFKRecordsByPostId(postId: number, role: string): Promise<void> {
        const queryParams: IQueryParameters = {
            format: 'post_id = $1',
            values: [postId]
        };

        return await this.storage.delete('text_to_post', queryParams, role);
    }

    public async filterByData(data: string, role: string): Promise<IPostTextRecord[]> {
        const queryParams: IQueryParameters = {
            format: 'data = $1',
            values: [data]
        };

        return await this.storage.filterByColumn(this.table, queryParams, role);
    }

    public async createFKPost(postId: number, textId: number, role: string): Promise<void> {
        const queryParams: IQueryParameters = {
            column: '(post_id, text_id)',
            format: '($1, $2)',
            values: [postId, textId]
        }

        return await this.storage.create('text_to_post', queryParams, role);
    }
};