import pandas as pd
import os
import requests
import json
from tenacity import retry, stop_after_attempt, wait_fixed
from utils._constants import *
from database.crud import *

api_key = os.getenv("API_KEY") 

def bestbuy_data_pull(endpoint: str, fields: str):
    last_page = 2
    data = []

    params = {
            'format': 'json',
            'show': fields,           
            'page': 1,
            'pageSize': '100',
            'apiKey': api_key,
        }

    while params['page'] <= last_page:
        try:
            response = get_data_with_retry(BESTBUY_API_URL + f'/{endpoint}', params)
            response_json = response.json()
            if endpoint == 'products':
                for entry in response_json[endpoint]:
                    entry['categories'] = ''
                    for category in entry['categoryPath']:
                        entry['categories'] += category['name'] + ', '
                    entry['categories'] = entry['categories'][:-2]
                    del entry['categoryPath']
            data.extend(response_json[endpoint])
            last_page = int(response_json['totalPages'])

        except:
            pass
        params['page'] += 1

    return pd.DataFrame(data)

@retry(stop=stop_after_attempt(3), wait=wait_fixed(3))
def get_data_with_retry(url, params: json):
    return requests.get(url, params)