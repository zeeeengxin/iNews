import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min.js';

import React from 'react';
import App from '../App/App';
import Auth from '../Auth/Auth';
import LoginPage from '../Login/LoginPage';
import SignUpPage from '../SignUp/SignUpPage';
import { BrowserRouter as Router, Route, Link, withRouter } from 'react-router-dom';

import './Base.css'

const logout = (history) => {
	Auth.deAuthenticateUser();
	history.push('/login');
}

const Base = withRouter(({ history }) => (
	<div>
        <nav className="nav-bar teal accent-4">
            <div className="nav-wrapper nav-container" >
                <a href="/" className="brand-logo">   iNews </a>
                <ul id="nav-mobile" className="right">           
                    { Auth.isUserAuthenticated() ? 
                    (<div>
                        <li> Login as {Auth.getEmail()} </li>
                        <li> 
                            <a onClick={() => {logout(history);}}>Log Out</a>
                        </li>
                    </div>
                    )
                    :
                    (<div>
                        <li> <Link to="/login"> Log In </Link> </li>
                        <li> <Link to="/signup"> Sign Up </Link> </li>
                    </div>
                    )}
                </ul>
            </div>
        </nav>
        <br/>
        <Route exact path="/" render={() => (Auth.isUserAuthenticated() ?
        	(<App />) : (<LoginPage />))} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/signup" component={SignUpPage} />
    </div>
));
    
export default Base;