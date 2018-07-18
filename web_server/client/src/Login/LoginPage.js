// only deal with logic
import LoginForm from './LoginForm';

import React from 'react';

class LoginPage extends React.Component {
	constructor() {
		super();

		//set state
		this.state = {
			errors: {},
			user: {
				email: '',
				password: ''
			}
		};
		
		this.processForm = this.processForm.bind(this);
    	this.changeUser = this.changeUser.bind(this);
	}

	changeUser(event) {
		const field = event.target.name; // email || password
		const user = this.state.user;
		user[field] = event.target.value; 
	}

	processForm(event) {
		event.preventDefault();

		const email = this.state.user.email;
		const password = this.state.user.password;

		console.log('email: ', email);
		console.log('password: ', password);
		//todo: backend
	}

	render() {
		return (
			<LoginForm
				onSubmit={(e) => this.processForm(e)} 
				onChange={(e) => this.changeUser(e)} 
				errors={this.state.errors}
			/>
		);
	}
}

export default LoginPage;