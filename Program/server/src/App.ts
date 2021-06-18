import * as express from 'express';
import { Application } from 'express';

import * as jwt from 'jsonwebtoken';
import * as cookieParser from 'cookie-parser';
import * as fileUpload from 'express-fileupload';

import Manager from './Manager';

const withAuth = require('./middleware');

class App {
    private app: Application;
    private port: number;

    private secret: string = 'sashka';

    private manager: Manager;

    constructor(listenPort: number = 5015) {
        this.app = express();
        this.port = listenPort;

        this.manager = new Manager();
    }

    public start(): void {
        try {
            this.app.listen(this.port);
            console.log(`Server start success on ${this.port}`);
        } catch (error) {
            console.log(`Server startup error ${error}`);
        }

        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(cookieParser());
        this.app.use(fileUpload());
        this.app.use(express.static('./static'));
        this.app.use(this.initHeaders);

        this.app.post('/api/signin', this.signin.bind(this));
        this.app.post('/api/signup', this.signup.bind(this));
        this.app.post('/api/checkToken', withAuth, this.checkToken.bind(this));

        this.app.get('/api/loginGuest/', this.loginGuest.bind(this));

        this.app.post('/api/refresh', this.refresh.bind(this));
        this.app.post('/api/supply', this.supply.bind(this));

        this.app.post('/api/add/post', this.addPost.bind(this));
        this.app.post('/api/del/post', this.delPost.bind(this));

        this.app.post('/api/inc/rating', this.incRating.bind(this));
        this.app.post('/api/dec/rating', this.decRating.bind(this));

        this.app.post('/api/add/review', this.addReview.bind(this));
        this.app.post('/api/del/review', this.delReview.bind(this));
    }

    private initHeaders(request: any, response: any, next: any): void {
        response.setHeader('Access-Control-Allow-Origin', `http://localhost:6969`);
        response.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
        response.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
        next();
    }

    private signin(request: any, response: any, next: any): void {
        this.manager.signin(request.body)
            .then(result => {
                const payload = { user: result };
                const token = jwt.sign(payload, this.secret);

                response.status(200).send({ token: token });
            })
            .catch(error => response.status(404).send(error));
    }

    private signup(request: any, response: any): void {
        this.manager.signup(request.body)
            .then(result => {
                const payload = { user: result };
                const token = jwt.sign(payload, this.secret);

                response.status(201).send({ token: token });
            })
            .catch(error => response.status(500).send('Error with sign up, please try again later' + error));
    }

    private loginGuest(request: any, response: any): void {
        const payload = {
            user: {
                id: -1,
                name: 'Guest',
                role: 'guest',
                avatar: 'placeholder'
            }
        };

        const token = jwt.sign(payload, this.secret);
        response.status(200).send({ token: token });
    }

    private checkToken(request: any, response: any): void {
        this.manager.setRole(request.user.role);
        response.status(200).send(request.user);
    }

    private refresh(request: any, response: any): void {
        let date: Date = new Date(request.body.date);
        date.setHours(date.getHours() + 3);

        this.manager.loadNewPosts(date)
            .then(result => response.status(200).send(result))
            .catch(error => response.status(500).send(error));
    }

    private supply(request: any, response: any): void {
        let date: Date = new Date(request.body.date);
        let count: number = request.body.count;

        date.setHours(date.getHours() + 3);

        this.manager.loadOldPosts(date, count)
            .then(result => response.status(200).send(result))
            .catch(error => response.status(500).send(error));
    }

    private addPost(request: any, response: any): void {
        this.manager.addPost(request.body);
    }

    private delPost(request: any, response: any): void {
        this.manager.deletePost(request.body.id);
    }

    private incRating(request: any, response: any): void {
        this.manager.incRating(request.body.id);
    }

    private decRating(request: any, response: any): void {
        this.manager.decRating(request.body.id);
    }

    private addReview(request: any, response: any): void {
        let date: Date = new Date(request.body.date);
        date.setHours(date.getHours() + 3);

        this.manager.addReview(request.body);
    }

    private delReview(request: any, response: any): void {
        this.manager.deleteReview(request.body.id);
    }
};

export default App;