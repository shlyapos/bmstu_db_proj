import { BaseStorage, IQueryParameters } from '../storage/BaseStorage'
import { BaseRepository, IRecord } from "./BaseRepository";

export interface IPostRecord extends IRecord {
    author_id: number,
    rating: number,
    public_date: Date
};

export class PostRepository extends BaseRepository {
    constructor(currentStorage: BaseStorage) {
        super();

        this.table = 'post';
        this.storage = currentStorage;
    }

    public async takeAll(role: string): Promise<IPostRecord[]> {
        return await this.storage.takeAll(this.table, role)
    }

    public async takeById(id: number, role: string): Promise<IPostRecord> {
        const result = await this.storage.takeById(this.table, id, role);
        return result[0];
    }

    public async create(newData: IPostRecord, role: string): Promise<any> {
        const queryParams: IQueryParameters = {
            column: '(author_id, rating, public_date)',
            format: '($1, $2, $3)',
            values: [newData.author_id, newData.rating, newData.public_date]
        }

        await this.storage.create(this.table, queryParams, role)
            .catch(error => console.log(error));
    }

    public async delete(id: number, role: string): Promise<any> {
        const queryParams: IQueryParameters = {
            format: 'id = $1',
            values: [id]
        }

        return await this.storage.delete(this.table, queryParams, role);
    }

    public async filterByDateEarly(date: Date, role: string): Promise<IPostRecord[]> {
        const queryParams: IQueryParameters = {
            format: 'public_date > $1 ORDER BY public_date DESC',
            values: [date]
        }

        return await this.storage.filterByColumn(this.table, queryParams, role);
    }

    public async filterByDateLater(date: Date, count: number, role: string): Promise<IPostRecord[]> {
        const queryParams: IQueryParameters = {
            format: 'public_date < $1 ORDER BY public_date DESC OFFSET 0 ROWS FETCH NEXT $2 ROWS ONLY',
            values: [date, count]
        }

        return await this.storage.filterByColumn(this.table, queryParams, role);
    }

    public async filterByAuthorId(id: number, role: string): Promise<IPostRecord[]> {
        const queryParams: IQueryParameters = {
            format: 'author_id = $1',
            values: [id]
        }

        return await this.storage.filterByColumn(this.table, queryParams, role);
    }

    public async updatePostRating(id: number, rating: number, role: string): Promise<void> {
        const queryParams: IQueryParameters = {
            column: 'rating = $1',
            format: 'WHERE id = $2',
            values: [rating, id]
        }

        this.storage.update(this.table, queryParams, role);
    }

    public async de77cRating(id: number, role: string): Promise<void> {

    }
};