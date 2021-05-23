import { BaseStorage } from "./BaseStorage";
import { Dictionary } from "lodash";

// Class for repository tests
export class ArrayStorage extends BaseStorage {
    private data: Dictionary<any[]> = {};

    constructor() {
        super();
        this.initTables();
    }

    public takeAll(tableName: string): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            resolve(this.data[tableName]);
        });
    }

    public takeById(tableName: string, id: number): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            for (const row of this.data[tableName]) {
                if (row.id === id) {
                    resolve(row);
                    break;
                }
            }
        });
    }

    public create(tableName: string, newData: any): void {
        this.data[tableName].push(newData);
    }

    public update(tableName: string, id: number, newData: any): void {
        for (let row of this.data[tableName]) {
            if (row.id === id) {
                row = newData;
                break;
            }
        }
    }

    public delete(tableName: string, id: number): void {
        let table = this.data[tableName];

        for (let i = 0; i < table.length; i++) {
            if (table[i].id === id) {
                table.splice(i, 1);
                break;
            }
        }
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