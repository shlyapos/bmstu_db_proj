import { PgConnection } from "./connection";

export interface ISqlWriteStorage {
    create(): boolean;
    update(): boolean;
    delete(): boolean;
}

export interface ISqlReadStorage {
    takeAll(tableName: string): boolean;
    takeById(tableName: string, id: number): boolean;
}

export abstract class BaseStorage implements ISqlWriteStorage, ISqlReadStorage {
    public takeAll(tableName: string): boolean {
        throw new Error("Method not implemented.");
    }

    public takeById(tableName: string, id: number): boolean {
        throw new Error("Method not implemented.");
    }

    public create(): boolean {
        throw new Error("Method not implemented.");
    }

    public update(): boolean {
        throw new Error("Method not implemented.");
    }

    public delete(): boolean {
        throw new Error("Method not implemented.");
    }
};

export class SqlStorage extends BaseStorage {
    private connect: PgConnection;

    constructor() {
        super();
        this.connect = PgConnection.getInstance();
    }

    private queryProcessing(err: any, data: any): void {
        if (err)
            throw new Error(`${err}`);

        console.log(data.rows);
        this.connect.getConnect().end();
    }

    public takeAll(tableName: string): boolean {
        this.connect.getConnect().query(`SELECT * FROM ${tableName}`,
            (err, data) => this.queryProcessing(err, data));

        return true;
    }

    public takeById(tableName: string, id: number): boolean {
        this.connect.getConnect().query(`SELECT * FROM ${tableName} WHERE id = ${id}`,
            (err, data) => this.queryProcessing(err, data));

        return true;
    }
}
