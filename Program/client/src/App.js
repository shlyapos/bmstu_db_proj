import React from "react";
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Header from './Header'
import LoginContainer from './LoginContainer';
import FeedContainer from './FeedContainer';

import CheckAuth from "./middleware/CheckAuth";

import './style.css'
import ProtectComponent from "./middleware/ProtectComponent";

const publicDir = process.env.PUBLIC_URL;

class App extends React.Component {
    _isMounted = false;

    constructor(props) {
        super(props);

        this.avatarPlaceholder = publicDir + '/avatar_placeholder.png';

        this.signin = this.signin.bind(this);
        this.signup = this.signup.bind(this);
        this.logout = this.logout.bind(this);
        this.loginGuest = this.loginGuest.bind(this);
        this.handleWindowBeforeUnload = this.handleWindowBeforeUnload.bind(this);
        this.updateCurrentUser = this.updateCurrentUser.bind(this);

        this.guest = {
            user: {
                id: null,
                role: 'none',
                name: 'Guest',
                avatar: this.avatarPlaceholder
            },
            warningSignIn: 'none',
            warningSignUp: 'none',
            login: false
        }

        this.state = this.guest;
        this.updateCurrentUser();
    }

    componentDidMount() {
        window.addEventListener('beforeunload', this.handleWindowBeforeUnload);

        this._isMounted = true;
        this.updateCurrentUser();
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    handleWindowBeforeUnload() {
        if (this.state.user.role === 'guest')
                localStorage.removeItem('token');
    }

    async updateCurrentUser() {
        await fetch('/api/checkToken', {
            method: 'POST',
            body: JSON.stringify({ token: localStorage.getItem('token') }),
            headers: { 'Content-Type': 'application/json' }
        })
        .then(result => { 
            if (result.status === 200) result.json()
            .then(data => {
                if (this._isMounted) {
                    const avatar = data.avatar === 'placeholder' ? this.avatarPlaceholder : data.avatar;

                    this.setState({
                        user: {
                            id: data.id,
                            role: data.role,
                            name: data.name,
                            avatar: avatar
                        },
                        login: true
                    });
                }
            })
        })
        .catch(error => {
            this.setState(this.guest);
        });
    }

    async signin(login, password) {
        await fetch('/api/signin', {
            method: 'POST',
            body: JSON.stringify({ login, password }),
            headers: { 'Content-Type': 'application/json' }
        })
        .then(result => {
            if (result.status === 200) result.json()
            .then(data => {
                localStorage.setItem('token', data.token);
                this.updateCurrentUser();
            });
            else {
                this.setState({ warningSignIn: 'Неправильный логин или пароль' })
            }
        })
        .catch(error => console.log(error));
    }

    async signup(newUser) {
        await fetch('/api/signup', {
            method: 'POST',
            body: JSON.stringify(newUser),
            headers: { 'Content-Type': 'application/json' }
        })
        .then(result => {
            if (result.status === 201) result.json()
            .then(data => {
                localStorage.setItem('token', data.token);
                this.updateCurrentUser();
            });
            else {
                this.setState({ warningSignUp: 'Пользователь с таким логином уже существует' })
            }
        })
        .catch(error => console.log(error))
    }

    async loginGuest() {
        await fetch('/api/loginGuest/', {
            method: 'GET'
        })
        .then(result => {
            if (result.status === 200) result.json()
            .then(data => {
                localStorage.setItem('token', data.token);
                this.updateCurrentUser();
            });
        })
        .catch(error => console.log(error))
    }

    logout() {
        delete localStorage.token;
        delete localStorage.user;

        this.setState(this.guest);
    }

    render(props) {
        return (
            <div>
                <div className="head_wrapper">
                    <Header isLogin={this.state.login} role={this.state.user.role} loginFunc={this.logout} userName={this.state.user.name} userAvatar={this.state.user.avatar} />
                </div>
                <BrowserRouter>
                    <Switch>
                        <Route exact path='/' component={CheckAuth(() => <LoginContainer signin={this.signin} 
                                                                                         signup={this.signup} 
                                                                                         warningSignIn={this.state.warningSignIn} 
                                                                                         warningSignUp={this.state.warningSignUp} 
                                                                                         loginGuest={this.loginGuest}/>)} />
                        <Route exact path='/feed' component={ProtectComponent(() => <FeedContainer userId={this.state.user.id} userRole={this.state.user.role} />)} />
                    </Switch>
                </BrowserRouter>
            </div>
        );
    }
};

export default App;
