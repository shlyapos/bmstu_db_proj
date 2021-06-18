import { BaseStorage, IQueryParameters } from "../storage/BaseStorage";
import { BaseRepository, IRecord } from "./BaseRepository";

export interface ITagRecord extends IRecord {
    id?: number,
    name: string
}

export class TagRepository extends BaseRepository {
    constructor(currentStorage: BaseStorage) {
        super();

        this.table = 'tag';
        this.storage = currentStorage;
    }

    public async takeAll(role: string): Promise<ITagRecord[]> {
        return await this.storage.takeAll(this.table, role);
    }

    public async takeById(id: number, role: string): Promise<ITagRecord> {
        const result = await this.storage.takeById(this.table, id, role);
        return result[0];
    }

    public async create(newData: ITagRecord, role: string): Promise<any> {
        const queryParams: IQueryParameters = {
            column: '(name)',
            format: '($1)',
            values: [newData.name]
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

    public async takeByPictureId(pictureId: number, role: string): Promise<any> {
        const queryParams: IQueryParameters = {
            column: 'tag_to_picture.tag_id = tag.id',
            format: 'WHERE pic_id = $1',
            values: [pictureId]
        }

        return await this.storage.joinTables(this.table, 'tag_to_picture', queryParams, role);
    }

    public async takeByTextId(textId: number, role: string): Promise<any[]> {
        const queryParams: IQueryParameters = {
            column: 'tag_to_text.tag_id = tag.id',
            format: 'WHERE text_id = $1',
            values: [textId]
        }

        return await this.storage.joinTables(this.table, 'tag_to_text', queryParams, role);
    }

    public async takeByName(name: string, role: string): Promise<ITagRecord[]> {
        const queryParams: IQueryParameters = {
            format: 'name = $1',
            values: [name]
        };

        return await this.storage.filterByColumn(this.table, queryParams, role);
    }

    public async createFKByTextId(textId: number, tagId: number, role: string): Promise<void> {
        const queryParams: IQueryParameters = {
            column: '(tag_id, text_id)',
            format: '($1, $2)',
            values: [tagId, textId]
        }

        return await this.storage.create('tag_to_text', queryParams, role);
    }

    public async createFKByImageId(imageId: number, tagId: number, role: string): Promise<void> {
        const queryParams: IQueryParameters = {
            column: '(tag_id, pic_id)',
            format: '($1, $2)',
            values: [tagId, imageId]
        }

        return await this.storage.create('tag_to_picture', queryParams, role);
    }
};