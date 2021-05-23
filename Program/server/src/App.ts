import * as express from 'express';
import { Application } from 'express';

class App {
    private app: Application;
    private port: number;

    constructor(listenPort: number = 5015) {
        this.app = express();
        this.port = listenPort;
    }

    public start(): void {
        try {
            this.app.listen(this.port);
            console.log(`Server start success on ${this.port}`);
        } catch (error) {
            console.log(`Server startup error ${error}`);
        }

        this.app.use(express.json());
        this.app.use(express.urlencoded());
        this.app.use(express.static('./static'));
        this.app.use(this.initHeaders);

        // this.app.get('/', this.loadPage);

        this.app.post('/signin', this.signInVerification);
        this.app.post('/signup', this.signUpVerification);
    }

    private initHeaders(request: any, response: any, next: any): void {
        response.setHeader('Access-Control-Allow-Origin', `http://localhost:${this.port}`);
        response.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
        response.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
        next();
    }

    // private loadPage(request: any, response: any, next: any): void {
    //     console.log("{{ Load page }}");
    //     next();
    // }

    private signInVerification(request: any, response: any): void {
        // console.log(request.body);
        // const { login, password } = request.body;

        response.status(200).send({
            exist: true,
            user: {
                role: 'user',
                name: 'Саша Розетка',
                avatar: '../img/avatar1.png'
            }
        });
    }

    private signUpVerification(request: any, response: any): void {
        console.log(request.body);
    }
};

export default App;