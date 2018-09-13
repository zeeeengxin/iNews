// only deal with logic
import LoginForm from './LoginForm';

import Auth from '../Auth/Auth';

class LoginPage extends React.Component {
	constructor() {
		super();
		
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
		
		const url = 'http://' + window.location.hostname + ':4000/auth/login';
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
            	
            	res.json().then(json => {
            		console.log(json);
            		Auth.authenticateUser(json.token, email);
            		window.location.replace('/');
            	});
            } else {
            	console.log('Login failed');
            	res.json().then(json => {
            		const errors = json.errors ? json.errors : {};
            		errors.summary = json.message;
            		this.setState({errors});
            	});
            }
        });
            
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