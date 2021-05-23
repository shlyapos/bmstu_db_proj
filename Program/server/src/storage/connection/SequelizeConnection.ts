import { Sequelize } from "sequelize-typescript";

import * as fs from 'fs'
import * as path from 'path';

export class SequelizeConnection {
    private static instance: SequelizeConnection;
    private connect: Sequelize;

    private constructor() { }

    public static getInstance(): SequelizeConnection {
        if (!SequelizeConnection.instance) {
            SequelizeConnection.instance = new SequelizeConnection();
        }

        return SequelizeConnection.instance;
    }

    private initDatabase() {
        let configDir = path.join(__dirname, '../../dbconfig.json');
        let modelDir = path.join(__dirname, '../models/');

        let userData = JSON.parse(fs.readFileSync(configDir, 'utf8')).user;
        let dataBase = SequelizeConnection.getInstance();

        // console.log(modelDir);

        dataBase.connect = new Sequelize({
            database: userData.database,
            dialect: userData.dialect,
            host: userData.host,
            username: userData.username,
            password: userData.password,
            models: [modelDir],
            // models: [modelDir + '/*.model.ts'],
            modelMatch: (filename, member) => {
                return filename.substring(0, filename.indexOf('.model')) === member.toLowerCase();
            }
        });

        dataBase.connect.sync();

        return dataBase;
    }

    public getConnect(): Sequelize {
        try {
            let db = this.initDatabase();
            return db.connect;
        } catch (error) {
            throw new Error(`connection\n - ${error}`);
        }
    }
};