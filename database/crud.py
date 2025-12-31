import math
import pandas as pd
from sqlalchemy import create_engine, inspect, text
from utils._constants import *
from utils.helpers import camel_case_to_snake_case, remove_NaN

engine = create_engine(f'postgresql+psycopg2:///{DB_NAME}')

# region SELECT 

def get_rows(table_name: str):
    query = text(f'SELECT * FROM {table_name}')
    df = pd.read_sql(query, con=engine)
    df = df.where(pd.notna(df), None)
    results = df.to_dict(orient="records")
    cleaned_results = remove_NaN(results)
    
    return cleaned_results

def get_rows_by_field_values(table_name: str, field: str, values: list[str]):
    value_string = ''
    for value in values:
        value_string += f'\'{value}\',' if type(value) == str else f'{value},'
    value_string = value_string[:-1]
    query = text(F'SELECT * FROM {table_name} WHERE {field} IN({value_string})')
    results = pd.read_sql(query, con = engine).to_dict(orient="records")
    cleaned_results = remove_NaN(results)

    return cleaned_results

def get_rows_by_field_value_contains(table_name: str, field: str, value:str):
    query = text(F'SELECT * FROM {table_name} WHERE {field} like \'%{value}%\'')
    results = pd.read_sql(query, con = engine).to_dict(orient="records")
    cleaned_results = remove_NaN(results)

    return cleaned_results

# endregion

# region INSERT

def insert_row(table_name: str, row: pd.Series):
    df = pd.DataFrame([row])
    df.to_sql(table_name, engine, if_exists = 'append', index = False)

def insert_rows(table_name: str, df: pd.DataFrame) -> str:
    inspector = inspect(engine)
    if table_name in inspector.get_table_names():
        camel_case_to_snake_case(df)
        df.to_sql(table_name, engine, if_exists = 'append', index = False)
    else:
        raise ValueError('Error: Table name does not exist.')
    
# endregion

# region UPDATE
    
# def update_rows(table_name: str, updates: list[dict]):

# endregion

# region DELETE 

def delete_rows_by_field(table_name: str, field: str, values: list[int]):
    value_string = ''
    for value in values:
        value_string += f'{value},'
    value_string = value_string[:-1]
    query = text(f'DELETE FROM {table_name} WHERE {field} IN({value_string})')
    with engine.connect() as conn:
        conn.execute(query)
        conn.commit()

# endregion

if __name__ == '__main__':
    with open('testing1234.txt', 'a') as file:
        file.write(str(get_rows('products')))
    # print(products)