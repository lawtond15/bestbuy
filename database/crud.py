import math
import os
import pandas as pd
from dotenv import load_dotenv
from sqlalchemy import create_engine, inspect, text
from utils._constants import *
from utils.helpers import camel_case_to_snake_case, remove_NaN

load_dotenv()
DATABASE_URL = os.getenv("PROD_DATABASE_URL")
engine = create_engine(DATABASE_URL) 

def get_rows(table_name: str):
    query = text(f'SELECT * FROM {table_name}')
    df = pd.read_sql(query, con=engine)
    df = df.where(pd.notna(df), None)
    results = df.to_dict(orient="records")
    cleaned_results = remove_NaN(results)
    
    return cleaned_results

#Unimplemented, saving for future
def get_rows_by_field_values(table_name: str, field: str, values: list[str]):
    placeholders = ", ".join(f":val{i}" for i in range(len(values)))
    query = text(f"SELECT * FROM {table_name} WHERE {field} IN ({placeholders})")
    params = {f"val{i}": v for i, v in enumerate(values)}
    results = pd.read_sql(query, con=engine, params=params).to_dict(orient="records")
    cleaned_results = remove_NaN(results)

    return cleaned_results

def get_rows_by_field_value_contains(table_name: str, field: str, value:str):
    query = text(f"SELECT * FROM {table_name} WHERE {field} ILIKE :val")
    results = pd.read_sql(query, con=engine, params={"val": f"%{value}%"}).to_dict(orient="records")
    cleaned_results = remove_NaN(results)

    return cleaned_results

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
    
#Unimplemented, saving for future 
def delete_rows_by_field(table_name: str, field: str, values: list[int]):
    placeholders = ", ".join(f":val{i}" for i in range(len(values)))
    query = text(f'DELETE FROM {table_name} WHERE {field} IN({placeholders})')
    params = {f":val{i}": {v} for i, v in enumerate(values)}

    with engine.connect() as conn:
        conn.execute(query, params)
        conn.commit()