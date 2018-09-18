'''
Use NewsAPI to extract disgest
populate source
'''
from json import loads
import requests

NEWS_API_ENDPOINT = "https://newsapi.org/v1/" 
NEWS_API_KEY = "" 
ARTICLES_API = "articles"

BBC_NEWS = 'bbc-news'
CNN = 'cnn'
SORT_BY_TOP = 'top'

DEFAULT_SOURCES = [BBC_NEWS, CNN]


def _buildUrl(end_point=NEWS_API_ENDPOINT, api_name=ARTICLES_API):
    '''
    get url
    '''
    return end_point + api_name

def getNewsFromSources(sources=DEFAULT_SOURCES, sort_by=SORT_BY_TOP):
    articles = []

    for source in sources:
        payload = {'apiKey':NEWS_API_KEY,
                   'source':source,
                   'sortBy':sort_by}

        response = requests.get(_buildUrl(), params=payload)
        res_json = loads(response.content.decode('utf-8'))

        # Extract news from response
        if (res_json is not None and 
            res_json['status'] == 'ok' and 
            res_json['source'] is not None):
            # populate news source in each articles
            for news in res_json['articles']:
                news['source'] = res_json['source']

            articles.extend(res_json['articles'])

    return articles