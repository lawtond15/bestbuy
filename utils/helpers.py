import typing
import re
import math
import pandas as pd

def assemble_search_string(search_key_words: list) -> str:
    search_string = ''
    first_key_word = True
    for item in search_key_words:
        search_string += f'search={item}' if first_key_word else f'&search={item}'
        first_key_word = False

    return search_string

def camel_case_to_snake_case(df: pd.DataFrame):
    df.columns = df.columns.to_series().apply(lambda x: re.sub(r'(?<!^)(?=[A-Z])', '_', x).lower())

def remove_NaN(data: dict):
    cleaned_data = []
    for row in data:
        new_row = {}
        for key, value in row.items():
            if isinstance(value, float) and math.isnan(value):
                new_row[key] = None
            else:
                new_row[key] = value
        cleaned_data.append(new_row)
    
    return cleaned_data