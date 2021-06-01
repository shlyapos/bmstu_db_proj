import { BaseStorage, IQueryParameters } from "./BaseStorage";
import { Dictionary, cloneDeep } from "lodash";

// Class for repository tests
export default class ArrayStorage extends BaseStorage {
    private data: Dictionary<any[]> = {};

    constructor() {
        super();
        this.initTables();
    }

    public takeAll(tableName: string): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            if (this.data[tableName].length === 0)
                reject(new Error('Table is empty'));
            else
                resolve(this.data[tableName]);
        });
    }

    public takeById(tableName: string, id: number): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            let result = null;

            for (const row of this.data[tableName]) {
                if (row.id === id) {
                    result = cloneDeep(row);
                    break;
                }
            }

            if (result === null)
                reject(new Error(`Record with id: ${id} not exist`));
            else
                resolve(result);
        });
    }

    public create(tableName: string, params: IQueryParameters): Promise<any> {
        const record = params.values.reduce((newObj, item) => {
            newObj[item] = item;
            return newObj;
        }, {});

        return new Promise<any>((resolve, reject) => {
            try {
                this.data[tableName].push(record);
            } catch (error) {
                throw new Error(`Error with push ${error}`);
            }
        });
    }

    public update(tableName: string, id: number, newData: any): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            let isExist = false;
            let table = this.data[tableName];

            for (let i = 0; i < table.length; i++) {
                if (table[i].id === id) {
                    table[i] = cloneDeep(newData);
                    isExist = true;
                    break;
                }
            }

            if (!isExist)
                throw new Error(`Record with id: ${id} not exist`);
        })
    }

    public delete(tableName: string, id: number): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            let isExist = false;
            let table = this.data[tableName];

            for (let i = 0; i < table.length; i++) {
                if (table[i].id === id) {
                    table.splice(i, 1);
                    isExist = true;
                    break;
                }
            }

            if (!isExist)
                throw new Error(`Record with id: ${id} not exist`);
        })
    }

    private initTables(): void {
        this.data['account'] = [];
        this.data['post'] = [];
        this.data['post_text'] = [];
        this.data['post_picture'] = [];
        this.data['review'] = [];
        this.data['tag'] = [];
    }
};