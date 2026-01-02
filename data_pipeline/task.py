import pandas as pd
from data_pipeline.data_pipeline import bestbuy_data_pull
from services.services import insert_new_categories, insert_rows
from utils._constants import *

if __name__ == '__main__':
    # categories = bestbuy_data_pull('categories', CATEGORIES_FIELDS)
    # insert_new_categories(categories)
    products: pd.DataFrame = bestbuy_data_pull('products', PRODUCTS_FIELDS)
    insert_rows('products', products)