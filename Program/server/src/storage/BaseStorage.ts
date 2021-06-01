export interface IQueryParameters {
    column?: string,
    format?: string,
    values?: any[]
};

export abstract class BaseStorage {
    public takeAll(tableName: string): Promise<any> {
        throw new Error("Method not implemented.");
    }

    public takeById(tableName: string, id: number): Promise<any> {
        throw new Error("Method not implemented.");
    }

    public create(tableName: string, params: IQueryParameters): Promise<any> {
        throw new Error("Method not implemented.");
    }

    public update(tableName: string, id: number, newData: any): Promise<any> {
        throw new Error("Method not implemented.");
    }

    public delete(tableName: string, id: number): Promise<any> {
        throw new Error("Method not implemented.");
    }

    public close(): void {
        throw new Error("Method not implemented.");
    }

    public filterByColumn(tableName: string, params: IQueryParameters): Promise<any> {
        throw new Error("Method not implemented.");
    }

    public joinTables(tableNameFirst: string, tableNameSecond: string, params: IQueryParameters): Promise<any> {
        throw new Error("Method not implemented.");
    }
};
