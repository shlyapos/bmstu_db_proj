import { BaseStorage, IQueryParameters } from "../storage/BaseStorage";
import { BaseRepository, IRecord } from "./BaseRepository";

export interface IPostPicsRecord extends IRecord {
    path: string,
    post_id?: number,
    text_id?: number
};

export class PostPictureRepository extends BaseRepository {
    constructor(currentStorage: BaseStorage) {
        super();

        this.table = 'post_pict';
        this.storage = currentStorage;
    }

    public async takeAll(role: string): Promise<IPostPicsRecord[]> {
        return await this.storage.takeAll(this.table, role);
    }

    public async takeById(id: number, role: string): Promise<IPostPicsRecord> {
        const result = await this.storage.takeById(this.table, id, role);
        return result[0];
    }

    public async create(newData: IPostPicsRecord, role: string): Promise<IPostPicsRecord[]> {
        const queryParams: IQueryParameters = {
            column: '(path)',
            format: '($1)',
            values: [newData.path]
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

    public async takeByPostId(postId: number, role: string): Promise<IPostPicsRecord[]> {
        const queryParams: IQueryParameters = {
            column: this.table + '.id = picture_to_post.pict_id',
            format: 'WHERE picture_to_post.post_id = $1',
            values: [postId]
        };

        return await this.storage.joinTables(this.table, 'picture_to_post', queryParams, role);
    }

    public async deleteFKRecordsByPostId(postId: number, role: string): Promise<void> {
        const queryParams: IQueryParameters = {
            format: 'post_id = $1',
            values: [postId]
        };

        await this.storage.delete('picture_to_post', queryParams, role);
    }

    public async filterByPath(path: string, role: string): Promise<IPostPicsRecord[]> {
        const queryParams: IQueryParameters = {
            format: 'path = $1',
            values: [path]
        };

        return await this.storage.filterByColumn(this.table, queryParams, role);
    }

    public async createFKPost(postId: number, imageId: number, role: string): Promise<void> {
        const queryParams: IQueryParameters = {
            column: '(post_id, pict_id)',
            format: '($1, $2)',
            values: [postId, imageId]
        }

        return await this.storage.create('picture_to_post', queryParams, role);
    }
};