import React from "react";

const publicDir = process.env.PUBLIC_URL;

// TODO вывод неправильного входа на страницу а не в консоль :/

class SignInSection extends React.Component {
    constructor(props) {
        super(props);

        this.signinVerify = this.signinVerify.bind(this);

        this.state = {
            user: '',
            warning: this.props.warning
        };
    }

    signinVerify() {
        const login = document.getElementById("loginSignIn").value;
        const password = document.getElementById("passwordSignIn").value;

        let warning = document.getElementById('sign_in_warning');

        if (login !== '' && password !== '') {
            this.props.signin(login, password)
        } else {
            warning.innerHTML = "Некоторые поля не заполнены";
        }
    }

    render(props) {
        document.querySelector("title").innerHTML = 'Welcome! | Shlyapka';

        let warning = this.state.warning === 'none' ? '' : this.state.warning;

        return (
            <section className="log_in_section sign_in">
                <h1 className="log_in__heading log_in__text">Sign in</h1>

                <p id="sign_in_warning" className="log_in__warning">{warning}</p>

                <input type="text" required id="loginSignIn" className="log_in__input log_in__text" placeholder="Login" />
                <input type="password" required id="passwordSignIn" className="log_in__input log_in__text" placeholder="Password" />

                <button className="log_in__button log_in__text" onClick={this.signinVerify}>Log in</button>
            </section>
        );
    }
};

class SignUpSection extends React.Component {
    _avatarFile = 'none';

    constructor(props) {
        super(props);
        this.signupVerify = this.signupVerify.bind(this);

        this.state = {
            warning: this.props.warning
        }
    }

    signupVerify() {
        const firstName = document.getElementById("firstNameSignUp").value;
        const lastName = document.getElementById("lastNameSignUp").value;
        const login = document.getElementById("loginSignUp").value;
        const email = document.getElementById("emailSignUp").value;
        const password = document.getElementById("passwordSignUp").value;
        let avatar = document.getElementById("avatarSignUp").value;

        let warning = document.getElementById('sign_up_warning');

        if (firstName !== '' && login !== '' && email !== '' && password !== '') {
            if (avatar === '') avatar = 'placeholder';

            this.props.signup({ 
                name: firstName + ' ' + lastName, 
                login: login,
                email: email, 
                password: password,
                avatar: avatar
            });
            warning.innerHTML = "";
        }
        else {
            warning.innerHTML = "Некоторые обязательные поля не заполнены";
        }
    }

    updateAvatar() {
        const avatar = document.getElementById('avatarSignUp').value;
        const avatarPath = avatar === '' ? (publicDir + '/avatar_placeholder.png') : avatar;

        document.getElementById('avatarPreview').src = avatarPath;
    }

    render(props) {
        let warning = this.state.warning === 'none' ? '' : this.state.warning;

        return (
            <section className="log_in_section sign_up">
                <h1 className="log_in__heading log_in__text">Sign up</h1>

                <p id="sign_up_warning" className="log_in__warning">{warning}</p>

                <input type="text" required id="firstNameSignUp" className="log_in__input log_in__text" placeholder="First name" />
                <input type="text" id="lastNameSignUp" className="log_in__input log_in__text" placeholder="Last name" />
                <input type="text" required id="loginSignUp" className="log_in__input log_in__text" placeholder="Login" />
                <input type="text" required id="emailSignUp" className="log_in__input log_in__text" placeholder="Email" />
                <input type="password" required id="passwordSignUp" className="log_in__input log_in__text" placeholder="Password" />
                <input type="text" id="avatarSignUp" className="log_in__input log_in__text" placeholder="Avatar Url" onChange={this.updateAvatar}/>

                <div className="log_in__avatar">
                    <img id="avatarPreview" className="avatar__preview" src={process.env.PUBLIC_URL + '/avatar_placeholder.png'} alt="You'r Avatar" />
                </div>

                <button className="log_in__button log_in__text" onClick={this.signupVerify}>Confirm</button>
            </section>
        );
    }
};

class LoginContainer extends React.Component {
    constructor(props) {
        super(props);
        this.logInLikeGuest = this.logInLikeGuest.bind(this);
    }
    
    logInLikeGuest() {
        this.props.loginGuest();    
    }

    render(props) {
        return (
            <div className="log_in_wrapper">
                <div className="left_side">
                    <img className="log_in__poster" src={publicDir + '/poster.png'} alt="Shlyapka!"/>
                </div>
                <div className="right_side">
                    <button className="log_in__guest_btn log_in__text" onClick={this.logInLikeGuest}>Log in like guest</button>
                    <SignInSection signin={this.props.signin} warning={this.props.warningSignIn}/>
                    <SignUpSection signup={this.props.signup} warning={this.props.warningSignUp}/>
                </div>
            </div>
        );
    }
};

export default LoginContainer;