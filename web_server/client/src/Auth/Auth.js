class Auth {
    static authenticateUser(token, email) {
        localStorage.setItem('email', email);
        localStorage.setItem('token', token);
    }

    static isUserAuthenticated() {
  		// simple check in the frontend
        return localStorage.getItem('email') !== null
            && localStorage.getItem('token') !== null;
    }

    static deAuthenticateUser() {
        localStorage.removeItem('email');
        localStorage.removeItem('token');
    }

    static getToken() {
        return localStorage.getItem('token');
    }
    
    static getEmail() {
        return localStorage.getItem('email');
    }

}

export default Auth;