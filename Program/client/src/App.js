import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import Header from './Header'
import LoginContainer from './LoginContainer';
import FeedContainer from './FeedContainer';

import './style.css'

const publicDir = process.env.PUBLIC_URL;

// Роли на сайте
// none  - сайт предлагает регистрацию
// guest - сайт открывается только для просмотра
// user  - нормальный вид сайта
// admin - продвинутый вид сайта

class App extends React.Component {
    constructor(props) {
        super(props);
        this.changeUserInfo = this.changeUserInfo.bind(this);

        this.state = {
            userInfo: {
                role: 'user',
                name: 'Саша Розетка',
                avatar: publicDir + '/avatar_placeholder.png'
            }
        };
    }

    changeUserInfo(userData) {
        this.setState(state => {
            return ({
                userInfo: {
                    userRole: userData.role,
                    userName: userData.name,
                    userAvatar: userData.avatar
                }
            })
        });
    }

    render(props) {
        return (
            <div>
                <div className="head_wrapper">
                    <Header userName={this.state.userInfo.name} userAvatar={this.state.userInfo.avatar} />
                </div>
                <BrowserRouter>
                    <Switch>
                        <Route exact path='/' render={() => (<LoginContainer changeUserInfo={this.changeUserInfo}/>)} />
                        <Route exact path='/feed' render={() => (
                            this.state.userInfo.role !== 'none' ? <FeedContainer /> : <Redirect from='/feed' to='/' />
                        )} />
                    </Switch>
                </BrowserRouter>
            </div>
        );
    }
};

export default App;
