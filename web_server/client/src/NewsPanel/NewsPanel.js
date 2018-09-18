import './NewsPanel.css';

import Auth from '../Auth/Auth';
import NewsCard from '../NewsCard/NewsCard';
import React from 'react';

import _ from 'lodash';

class NewsPanel extends React.Component {
	constructor() {
		super();
		this.state = { news: null };
	}

	componentDidMount() {
		this.loadMoreNews();
		this.loadMoreNews = _.debounce(this.loadMoreNews, 1000);
		window.addEventListener('scroll', () => this.handleScroll());
	}

	handleScroll() {
		let scrollY = window.scrollY ||
                  window.pageYOffset ||
                  document.documentElement.scrollTop;
    	if ((window.innerHeight + scrollY) >= (document.body.offsetHeight - 50)) {
      		console.log('Handle scroll');
      		this.loadMoreNews();
    	}
	}

	renderNews() {
		const news_list = this.state.news.map((news) => {
			return(
				<a className='list-group-item'  href="#!">
					<NewsCard news={news} />
				</a>
			);
		});

		return (
			<div className='container-fluid'>
				<div className='list-group'>
					{news_list}
				</div>
			</div>
		);
	}

	loadMoreNews() {
		const news_url = 'http://' + window.location.hostname + ':4000/news';
		const request = new Request(news_url, {
			method: 'GET',
			headers: {
				'Authorization': 'bearer ' + Auth.getToken(),
			}
		});

		console.log("Load more news");
		fetch(request)
			.then(res => res.json())
			.then(new_news => {
				this.setState({
					news: this.state.news ? this.state.news.concat(new_news) : new_news
				});
			});
		
	}

	render() {
		if (this.state.news) {
			return (
				<div>
					{this.renderNews()}
				</div>   
			);
		} else {
			return (
				<div>
					Loading...
				</div>
			);
		}
	}
}

export default NewsPanel;