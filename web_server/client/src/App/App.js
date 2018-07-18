import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min.js';

import './App.css';

import NewsPanel from '../NewsPanel/NewsPanel';
import React from 'react';

class App extends React.Component {
	render() {
		return (
			<div>			
				<div className='container'>
					<h1>Hello, check today's news!</h1>
					<NewsPanel />
				</div>
			</div>
		);
	}
}

export default App;