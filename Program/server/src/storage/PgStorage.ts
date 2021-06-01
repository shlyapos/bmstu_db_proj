import { BaseStorage, IQueryParameters } from "./BaseStorage";
import PgConnection from "./connection/PgConnection";

export default class PgStorage extends BaseStorage {
    private db: PgConnection;

    constructor() {
        super();
        this.db = PgConnection.getInstance();
    }

    public async takeAll(tableName: string): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.db.getConnect().query(`SELECT * FROM ${tableName}`,
                (error, result) => {
                    if (error) reject(error);
                    if (result) resolve(result.rows);
                });
        });
    }

    public async takeById(tableName: string, currentId: number): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.db.getConnect().query(`SELECT * FROM ${tableName} WHERE id = ${currentId}`,
                (error, result) => {
                    if (error) reject(error);
                    if (result) resolve(result.rows);
                })
        });
    }

    public async create(tableName: string, params: IQueryParameters): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.db.getConnect().query(`INSERT INTO ${tableName} ${params.column} VALUES ${params.format}`,
                params.values,
                (error, result) => {
                    if (error) reject(error);
                    if (result) resolve(result);
                });
        });
    }

    public async filterByColumn(tableName: string, params: IQueryParameters): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.db.getConnect().query(`SELECT * FROM ${tableName} WHERE ${params.format}`,
                params.values,
                (error, result) => {
                    if (error) reject(error);
                    if (result) resolve(result.rows);
                });
        });
    }

    public async joinTables(tableNameFirst: string, tableNameSecond: string, params: IQueryParameters): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.db.getConnect().query(`SELECT * FROM ${tableNameFirst} JOIN ${tableNameSecond} ON ${params.column} ${params.format}`,
                params.values,
                (error, result) => {
                    if (error) reject(error);
                    if (result) resolve(result.rows);
                });
        });
    }

    public async close(): Promise<void> {
        await this.db.getConnect().end();
    }
};