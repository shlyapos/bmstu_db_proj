export interface IQueryParameters {
    column?: string,
    format?: string,
    values?: any[]
};

export abstract class BaseStorage {
    public takeAll(tableName: string, role: string): Promise<any> {
        throw new Error("Method not implemented.");
    }

    public takeById(tableName: string, id: number, role: string): Promise<any> {
        throw new Error("Method not implemented.");
    }

    public create(tableName: string, params: IQueryParameters, role: string): Promise<any> {
        throw new Error("Method not implemented.");
    }

    public update(tableName: string, params: IQueryParameters, role: string): Promise<any> {
        throw new Error("Method not implemented.");
    }

    public delete(tableName: string, params: IQueryParameters, role: string): Promise<any> {
        throw new Error("Method not implemented.");
    }

    public filterByColumn(tableName: string, params: IQueryParameters, role: string): Promise<any> {
        throw new Error("Method not implemented.");
    }

    public joinTables(tableNameFirst: string, tableNameSecond: string, params: IQueryParameters, role: string): Promise<any> {
        throw new Error("Method not implemented.");
    }
};
