import { Client } from 'pg'
import * as fs from 'fs';

export class PgConnection {
    private static instance: PgConnection;
    private connect: Client;

    private constructor() { }

    public static getInstance(): PgConnection {
        if (!PgConnection.instance) {
            PgConnection.instance = new PgConnection();
        }

        return PgConnection.instance;
    }

    private initDatabase() {
        let userData = JSON.parse(fs.readFileSync('config.json', 'utf8')).user;
        let dataBase = PgConnection.getInstance();

        dataBase.connect = new Client({
            user: userData.username,
            host: userData.host,
            database: userData.database,
            password: userData.password,
            port: userData.port
        });

        dataBase.connect.connect();

        return dataBase;
    }

    public getConnect(): Client {
        try {
            let db = this.initDatabase();
            return db.connect;
        } catch (error) {
            throw new Error(`Error with connection: ${error}`);
        }
    }
};