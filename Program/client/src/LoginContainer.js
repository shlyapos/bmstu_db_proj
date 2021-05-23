import React from "react";

const publicDir = process.env.PUBLIC_URL;

class SignInSection extends React.Component {
    async signInVerification() {
        const login = document.getElementById("loginSignIn").value;
        const password = document.getElementById("passwordSignIn").value;

        let warning = document.getElementById('sign_in_warning');

        if (login !== '' && password !== '') {
            // fetch('/signin', {
            //     method: "POST",
            //     headers: {
            //         "Content-Type": "application/json"
            //     },
            //     body: JSON.stringify({login, password})
            // });


            const requestOptions = { 
                method: 'POST',
                body: JSON.stringify({login, password})
            };

            const response = await fetch('/signin', requestOptions);
            const data = await response.json();
            // this.changeCurrentUser(data);
            // console.log(data);

            // fetch('/signin', {s
            //     method: "POST",
            //     headers: {
            //         "Content-Type": "application/json"
            //     },
            //     body: JSON.stringify({login, password})
            // }).then(response => {
            //     if (!response.ok) {
            //         return Promise.reject(new Error (
            //             'Response failed: ' + response.status + ' (' + response.statusText + ')'
            //         ));
            //     }

            //     response.json().then(data => {
            //         this.changeCurrentUser(data);
            //     });
            // });
            warning.innerHTML = '';
        }
        else {
            warning.innerHTML = "Некоторые поля не заполнены";
        }
    }

    render(props) {
        return (
            <section className="log_in_section sign_in">
                <h1 className="log_in__heading log_in__text">Sign in</h1>

                <p id="sign_in_warning" className="log_in__warning"></p>

                <input type="text" required id="loginSignIn" className="log_in__input log_in__text" placeholder="Login" />
                <input type="password" required id="passwordSignIn" className="log_in__input log_in__text" placeholder="Password" />

                <button className="log_in__button log_in__text" onClick={this.signInVerification}>Log in</button>
            </section>
        );
    }
};

class SignUpSection extends React.Component {
    signUpVerification() {
        const firstName = document.getElementById("firstNameSignUp").value;
        const lastName = document.getElementById("lastNameSignUp").value;
        const login = document.getElementById("loginSignUp").value;
        const email = document.getElementById("emailSignUp").value;
        const password = document.getElementById("passwordSignUp").value;

        let warning = document.getElementById('sign_up_warning');

        if (firstName !== '' && login !== '' && email !== '' && password !== '') {
            fetch('/signup', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    firstName,
                    lastName,
                    login,
                    email,
                    password
                })
            });

            warning.innerHTML = "";
        }
        else {
            warning.innerHTML = "Некоторые обязательные поля не заполнены";
        }
    }

    render(props) {
        return (
            <section className="log_in_section sign_up">
                <h1 className="log_in__heading log_in__text">Sign up</h1>

                <p id="sign_up_warning" className="log_in__warning"></p>

                <input type="text" required id="firstNameSignUp" className="log_in__input log_in__text" placeholder="First name" />
                <input type="text" id="lastNameSignUp" className="log_in__input log_in__text" placeholder="Last name" />
                <input type="text" required id="loginSignUp" className="log_in__input log_in__text" placeholder="Login" />
                <input type="text" required id="emailSignUp" className="log_in__input log_in__text" placeholder="Email" />
                <input type="password" required id="passwordSignUp" className="log_in__input log_in__text" placeholder="Password" />

                <div className="log_in__avatar">
                    <img className="avatar__preview" src={process.env.PUBLIC_URL + '/avatar_placeholder.png'} alt="You'r Avatar" />
                    <button className="avatar__button log_in__button log_in__text">Load avatar...</button>
                </div>

                <button className="log_in__button log_in__text" onClick={this.signUpVerification}>Confirm</button>
            </section>
        );
    }
};

class LoginContainer extends React.Component {
    render(props) {
        return (
            <div className="log_in_wrapper">
                <div className="left_side">
                    <img className="log_in__poster" src={publicDir + '/poster.png'} />
                </div>
                <div className="right_side">
                    <button className="log_in__guest_btn log_in__text" >Log in like guest</button>
                    <SignInSection />
                    <SignUpSection />
                </div>
            </div>
        );
    }
};

export default LoginContainer;