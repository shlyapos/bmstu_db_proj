import { BaseStorage } from '../storage/BaseStorage';

export interface IRecord {
    id?: number
};

export abstract class BaseRepository {
    protected table: string;
    protected storage: BaseStorage;

    public takeAll(role: string): Promise<IRecord[]> {
        throw new Error("Method not implemented.");
    }

    public takeById(id: number, role: string): Promise<IRecord> {
        throw new Error("Method not implemented.");
    }

    public create(newData: any, role: string): Promise<any> {
        throw new Error("Method not implemented.");
    }

    public update(id: number, newData: any, role: string): Promise<any> {
        throw new Error("Method not implemented.");
    }

    public delete(id: number, role: string): Promise<any> {
        throw new Error("Method not implemented.");
    }
};