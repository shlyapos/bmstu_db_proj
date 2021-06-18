import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

export default function ProtectComponent(ComponentToProtect) {
    return class extends Component {
        constructor() {
            super();
            this.state = {
                loading: true,
                redirect: false
            };
        }

        async componentDidMount() {
            await fetch('/api/checkToken', {
                method: 'POST',
                body: JSON.stringify({ token: localStorage.token }),
                headers: { 'Content-Type': 'application/json' }
            })
            .then(res => {
                if (res.status === 200) {
                    this.setState({ loading: false });
                } else {
                    this.setState({ loading: false, redirect: true });
                    // const error = new Error(res.error);
                    // throw error;
                }
            })
        }

        render() {
            const { loading, redirect } = this.state;

            if (loading) return null;
            if (redirect) return <Redirect to='/' />;

            return <ComponentToProtect {...this.props} />;
        }
    }
}