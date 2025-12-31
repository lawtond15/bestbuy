from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
from database.crud import *
from services.services import *

app = Flask(__name__)
CORS(app)

@app.route('/products')
def get_products() -> pd.DataFrame:
    return products().__dict__

@app.route('/products/<id>')
def get_product(id: int) -> pd.DataFrame:
    return products_by_field('id', id).__dict__

@app.route('/products/categories/<name>')
def get_products_by_categories(name: str):
    return products_by_field('categories', name).__dict__

@app.route('/categories')
def get_categories() -> pd.DataFrame:
    return categories().__dict__

@app.route('/categories/<id>')
def get_category(id: int) -> pd.DataFrame:
    return categories_by_field('id', id).__dict__

if __name__ == '__main__':
    app.run(debug=True)