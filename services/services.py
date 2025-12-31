import pandas as pd
from database.crud import *
from data_pipeline.data_pipeline import *
from utils._constants import CATEGORIES_FIELDS
from models.response import Response

#need to finish testing this to make sure dup inserts arent happening
def insert_new_categories(categories: pd.DataFrame):
    for index, category in categories.iterrows():
        if get_rows_by_field_value_contains('category', 'name', category['name']).empty:
            insert_row('category', category)

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

if __name__ == '__main__':
    categories = bestbuy_data_pull('categories', CATEGORIES_FIELDS)
    insert_new_categories(categories)