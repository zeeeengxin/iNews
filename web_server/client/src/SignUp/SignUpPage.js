import React from 'react';
import SignUpForm from './SignUpForm';

class SignUpPage extends React.Component {
    constructor() {
        super();

        this.state = {
            errors: {},
            user: {
                email: '',
                password: '',
                confirm_password: ''
            }
        };

        this.processForm = this.processForm.bind(this);
        this.changeUser = this.changeUser.bind(this);
    }

    processForm(event) {
        event.preventDefault();

        const email = this.state.user.email;
        const password = this.state.user.password;
        const confirm_password = this.state.user.confirm_password;

        console.log('email: ' + email);
        console.log('password: ' + password);
        console.log('confirm_password: ' + confirm_password);
        
        if (password !== confirm_password) {
            return;
        }
        const url = 'http://' + window.location.hostname + ':4000/auth/signup';
        const request = new Request(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        });

        fetch(request).then(res => {
            if (res.status === 200) {
                this.setState({ errors: {} });
                window.location.replace('/');
            } else {
                console.log('Signup failed');
                res.json().then(json => {
                    const errors = json.errors ? json.errors : {};
                    errors.summary = json.message;
                    this.setState({errors});
                });
            }
        });
    }

    changeUser(event) {
        const field = event.target.name;
        const user = this.state.user;
        user[field] = event.target.value;

        this.setState({
            user
        });

        const errors = this.state.errors;
        if (this.state.user.password !== this.state.user.confirm_password) {
            errors.password = "Password and Confirm Password don't match.";
        } else {
            errors.password = '';
        }
        this.setState({errors});
    }

    render() {
        return (
            <SignUpForm
                onSubmit={this.processForm}
                onChange={this.changeUser}
                errors={this.state.errors}
            />
        );
    }

}

export default SignUpPage;