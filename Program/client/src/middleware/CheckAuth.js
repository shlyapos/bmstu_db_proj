import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

export default function CheckAuth(ComponentToValidate) {
    return class extends Component {
        constructor() {
            super();
            this.state = {
                loading: true,
                redirect: false
            };
        }

        componentDidMount() {
            fetch('/api/checkToken', {
                method: 'POST',
                body: JSON.stringify({ token: localStorage.token }),
                headers: { 'Content-Type': 'application/json' }
            })
            .then(res => {
                if (res.status === 200) {
                    this.setState({ loading: false, redirect: true });
                } else {
                    this.setState({ loading: false });
                    // const error = new Error(res.error);
                    // throw error;
                }
            })
            .catch(error => console.log(error))
        }

        render() {
            const { loading, redirect } = this.state;

            if (loading) return null;
            if (redirect) return <Redirect to='/feed' />;

            return <ComponentToValidate {...this.props} />;
        }
    }
}