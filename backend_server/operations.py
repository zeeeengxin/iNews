import json
import os
import sys

from bson.json_util import dumps

sys.path.append(os.path.join(os.path.dirname(__file__), 'utils'))

import mongodb_client # pylint: disable=import-error, wrong-import-position

NEWS_TABLE_NAME = "news"

def get_one_news():
    db = mongodb_client.get_db()
    news = db[NEWS_TABLE_NAME].find_one()
    return json.loads(dumps(news))