import { rejects } from "assert";
import { BaseStorage } from "./BaseStorage";
import { PgConnection } from "./connection/PgConnection";

export class PgStorage extends BaseStorage {
    private connect: PgConnection;

    constructor() {
        super();
        this.connect = PgConnection.getInstance();
    }

    public async takeAll(tableName: string): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.connect.getConnect().query(`SELECT * FROM ${tableName}`, (error, result) => {
                if (error) reject(error);
                if (result) resolve(result.rows);
            });
        });
    }

    public async takeById(tableName: string, currentId: number): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.connect.getConnect().query(`SELECT * FROM ${tableName} WHERE id = ${currentId}`, (error, result) => {
                if (error) reject(error);
                if (result) resolve(result.rows);
            })
        });
    }
};