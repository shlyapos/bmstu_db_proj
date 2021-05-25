import { BaseStorage } from "src/storage/BaseStorage";

export abstract class BaseRepository {
    protected table: string;
    protected storage: BaseStorage;

    public takeAll(): Promise<any> {
        throw new Error("Method not implemented.");
    }

    public takeById(id: number): Promise<any> {
        throw new Error("Method not implemented.");
    }

    public create(newData: any): Promise<any> {
        throw new Error("Method not implemented.");
    }

    public update(id: number, newData: any): Promise<any> {
        throw new Error("Method not implemented.");
    }

    public delete(id: number): Promise<any> {
        throw new Error("Method not implemented.");
    }
};