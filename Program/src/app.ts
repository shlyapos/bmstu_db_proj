import * as express from 'express';
import { Application } from 'express';

import * as fs from 'fs';

class App {
    public app: Application;
    public port: number;

    constructor(listenPort: number = 5015) {
        this.app = express();
        this.port = listenPort;
    }

    public start() {
        try {
            this.app.listen(this.port);
            console.log(`Server start success on ${this.port}`);
        } catch (error) {
            console.log(`Server startup error ${error}`);
        }

        this.app.use(express.static('./static'))

        this.app.get(`/mainpage`, this.openMainPage);
    }

    private openMainPage(request: any, response: any) {
        const content = fs.readFileSync('./static/html/mainpage.html', "utf8");
        response.end(content);
    }
};

export default App;