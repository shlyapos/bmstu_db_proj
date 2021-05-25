import { PgConnection } from "./connection/PgConnection";

export interface IWriteStorage {
    create(tableName: string, newData: any): Promise<any>;
    update(tableName: string, currentId: number, newData: any): Promise<any>;
    delete(tableName: string, id: number): Promise<any>;
}

export interface IReadStorage {
    takeAll(tableName: string): Promise<any>;
    takeById(tableName: string, id: number): Promise<any>;
}

export abstract class BaseStorage implements IWriteStorage, IReadStorage {
    public takeAll(tableName: string): Promise<any> {
        throw new Error("Method not implemented.");
    }

    public takeById(tableName: string, id: number): Promise<any> {
        throw new Error("Method not implemented.");
    }

    public create(tableName: string, newData: any): Promise<any> {
        throw new Error("Method not implemented.");
    }

    public update(tableName: string, id: number, newData: any): Promise<any> {
        throw new Error("Method not implemented.");
    }

    public delete(tableName: string, id: number): Promise<any> {
        throw new Error("Method not implemented.");
    }
};
