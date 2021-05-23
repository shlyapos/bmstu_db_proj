import { BaseStorage } from "src/storage/BaseStorage";

export abstract class BaseRepository {
    protected table: string;
    protected storage: BaseStorage;

    public takeAll(): any {
        throw new Error("Method not implemented.");
    }

    public takeById(id: number): any {
        throw new Error("Method not implemented.");
    }

    public create(newData: any): void {
        throw new Error("Method not implemented.");
    }

    public update(id: number, newData: any): void {
        throw new Error("Method not implemented.");
    }

    public delete(id: number): void {
        throw new Error("Method not implemented.");
    }
};