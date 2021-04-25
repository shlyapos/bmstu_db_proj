import { ISqlWriteStorage, ISqlReadStorage, BaseStorage, SqlStorage } from "./storage";

export abstract class BaseRepository implements ISqlWriteStorage, ISqlReadStorage {
    protected storage: BaseStorage;

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