import pandas as pd
from datetime import datetime
from database.crud import *
from data_pipeline.data_pipeline import *
from utils._constants import CATEGORIES_FIELDS
from models.response import Response

#need to finish testing this to make sure dup inserts arent happening
def insert_new_categories(categories: pd.DataFrame):
    for index, category in categories.iterrows():
        if not get_rows_by_field_value_contains('categories', 'name', category['name']):
            insert_row('categories', category)

def categories() -> Response:
    content = ''
    try:
        content: list[dict] = get_rows('categories')
        message: str = 'Success'
    except Exception as e:
        message: str = 'Error: ' + str(e)

    return Response(message, content)

def categories_by_field(field: str, value: str) -> Response:
    content = ''
    try:
        content: list[dict] = get_rows_by_field_value_contains('categories', field, value)
        message: str = 'Succes'
    except Exception as e:
        message: str = 'Error: ' + str(e)

    return Response(message, content)

def products() -> Response:
    content = ''
    try:
        content: list[dict] = get_rows('products')
        message: str = 'Success'
    except Exception as e:
        message: str = 'Error: ' + str(e)

    return Response(message, content)

def products_by_field(field: str, value: str) -> Response:
    content = ''
    try:
        content: list[dict] = get_rows_by_field_value_contains('products', field, value)
        message: str = 'Success'
    except Exception as e:
        message: str = 'Error: ' + str(e)

    return Response(message, content)

def pull_pipeline_log():
    content = ''
    try:
        content: list[dict] = get_rows('pipeline_log')
        message: str = 'Success'
    except Exception as ex:
        message: str = 'Failure'

    return Response(message, content)

def refresh_pipeline():
    content = ''
    try:
        products: pd.DataFrame = bestbuy_data_pull('products', PRODUCTS_FIELDS)
        insert_rows('products', products)
        categories: pd.DataFrame = bestbuy_data_pull('categories', CATEGORIES_FIELDS)
        insert_new_categories(categories)
        pipeline_refresh_log: pd.DataFrame = pd.DataFrame({'date': [datetime.today()], 'status': ['Success']})
        message: str = 'Success'
    except Exception as e:
        message: str = 'Error: ' + str(e)
        pipeline_refresh_log: pd.DataFrame = pd.DataFrame({'date': [datetime.today()], 'status': ['Failure']})

    insert_rows('pipeline_log', pipeline_refresh_log)

    return Response(message, content)