import { Client, Pool } from 'pg';

import * as fs from 'fs';
import * as path from 'path';

export default class PgConnection {
    private static instance: PgConnection;
    // private connect: Client;
    private connect: Pool = null;

    private constructor() { }

    public static getInstance(): PgConnection {
        if (!PgConnection.instance) {
            PgConnection.instance = new PgConnection();
        }

        return PgConnection.instance;
    }

    private initDatabase() {
        let dataBase = PgConnection.getInstance();

        if (dataBase.connect == null) {
            let configDir = path.join(__dirname, '../../../dbconfig.json');
            let userData = JSON.parse(fs.readFileSync(configDir, 'utf8')).user;

            // dataBase.connect = new Client({
            //     user: userData.username,
            //     host: userData.host,
            //     database: userData.database,
            //     password: userData.password,
            //     port: userData.port
            // });

            dataBase.connect = new Pool({
                database: userData.database,
                user: userData.username,
                password: userData.password,
                port: userData.port,
                host: userData.host,
                max: 20,
                idleTimeoutMillis: 0,
                connectionTimeoutMillis: 0,
            });

            dataBase.connect.connect();
        }

        return dataBase;
    }

    public getConnect(): Pool {
        try {
            let db = this.initDatabase();
            return db.connect;
        } catch (error) {
            throw new Error(`Error with connection: ${error}`);
        }
    }

    public endConnect(): void {
        this.connect.end();
    }
};