import { BaseStorage, IQueryParameters } from "./BaseStorage";
import PgConnection from "./connection/PgConnection";

export default class PgStorage extends BaseStorage {
    private db: PgConnection;

    constructor() {
        super();
        this.db = PgConnection.getInstance();
    }

    public async takeAll(tableName: string, role: string): Promise<any> {
        return await new Promise<any>(async (resolve, reject) => {
            const client = await this.db.getConnect(role);

            await client.query(`SELECT * FROM ${tableName}`,
                (error: any, result: { rows: any; }) => {
                    if (error) reject(error);
                    if (result) resolve(result.rows);
                }
            );

            client.release();
        });
    }

    public async takeById(tableName: string, currentId: number, role: string): Promise<any> {
        return await new Promise<any>(async (resolve, reject) => {
            const client = await this.db.getConnect(role);

            await client.query(`SELECT * FROM ${tableName} WHERE id = ${currentId}`,
                (error: any, result: { rows: any; }) => {
                    if (error) reject(error);
                    if (result) resolve(result.rows);
                }
            );

            client.release();
        });
    }

    public async create(tableName: string, params: IQueryParameters, role: string): Promise<any> {
        return await new Promise<any>(async (resolve, reject) => {
            const client = await this.db.getConnect(role);

            await client.query(`INSERT INTO ${tableName} ${params.column} VALUES ${params.format}`,
                params.values,
                (error: any, result: any) => {
                    if (error) return reject(error);
                    if (result) return resolve(result);
                }
            );

            client.release();
        });
    }

    public async delete(tableName: string, params: IQueryParameters, role: string): Promise<any> {
        return await new Promise<any>(async (resolve, reject) => {
            const client = await this.db.getConnect(role);

            await client.query(`DELETE FROM ${tableName} WHERE ${params.format}`,
                params.values,
                (error: any, result: any) => {
                    if (error) reject(error);
                    if (result) resolve(result.rows);
                }
            );

            client.release();
        });
    }

    public async update(tableName: string, params: IQueryParameters, role: string): Promise<void> {
        return new Promise<void>(async (resolve, reject) => {
            const client = await this.db.getConnect(role);

            await client.query(`UPDATE ${tableName} SET ${params.column} ${params.format}`,
                params.values,
                (error: any, result: any) => {
                    if (error) reject(error);
                    if (result) resolve(result);
                });

            client.release()
        });
    }

    public async filterByColumn(tableName: string, params: IQueryParameters, role: string): Promise<any> {
        return await new Promise<any>(async (resolve, reject) => {
            const client = await this.db.getConnect(role);

            await client.query(`SELECT * FROM ${tableName} WHERE ${params.format}`,
                params.values,
                (error: any, result: { rows: any; }) => {
                    if (error) reject(error);
                    if (result) resolve(result.rows);
                }
            );

            client.release();
        });
    }

    public async joinTables(tableNameFirst: string, tableNameSecond: string, params: IQueryParameters, role: string): Promise<any> {
        return await new Promise<any>(async (resolve, reject) => {
            const client = await this.db.getConnect(role);

            await client.query(`SELECT * FROM ${tableNameFirst} JOIN ${tableNameSecond} ON ${params.column} ${params.format}`,
                params.values,
                (error: any, result: { rows: any; }) => {
                    if (error) reject(error);
                    if (result) resolve(result.rows);
                }
            );

            client.release();
        });
    }
};