import { Client, Pool } from 'pg';

import * as fs from 'fs';
import * as path from 'path';

export default class PgConnection {
    private static instance: PgConnection;
    // private connect: Client;
    private connect: Pool = null;
    private role: string;

    private constructor() { }

    public static getInstance(): PgConnection {
        if (!PgConnection.instance) {
            PgConnection.instance = new PgConnection();
        }

        return PgConnection.instance;
    }

    private initDatabase(role: string) {
        let dataBase = PgConnection.getInstance();

        if (dataBase.connect === null || this.role !== role) {
            this.role = role;

            let configDir = path.join(__dirname, '../../../dbconfig.json');
            let userData = JSON.parse(fs.readFileSync(configDir, 'utf8'))[role];

            dataBase.connect = new Pool({
                database: userData.database,
                user: userData.username,
                password: userData.password,
                port: userData.port,
                host: userData.host,
                connectionTimeoutMillis: 0,
            });
        }

        return dataBase;
    }

    public getConnect(role: string): any {
        try {
            let db = this.initDatabase(role);
            return db.connect.connect();
        } catch (error) {
            throw new Error(`Error with connection: ${error}`);
        }
    }

    public endConnect(): void {
        try {
            this.connect.end();
        } catch (error) {
            throw new Error(`Error with connection: ${error}`);
        }
    }
};