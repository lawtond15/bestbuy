import os
from flask import Flask, request, send_from_directory
from flask_cors import CORS
import pandas as pd
from database.crud import *
from services.services import *

BASE_DIR = os.path.abspath(os.path.dirname(__file__))
PROJECT_ROOT = os.path.abspath(os.path.join(BASE_DIR, ".."))

app = Flask(
    __name__,
    static_folder=os.path.join(PROJECT_ROOT, "UI", "dist"),
    static_url_path=""
)

@app.route('/')
def serve_ui():
    return send_from_directory(app.static_folder, "index.html")

@app.route('/products')
def get_products() -> dict:
    return products().__dict__

@app.route('/products/<id>')
def get_product(id: int) -> dict:
    return products_by_field('id', id).__dict__

@app.route('/products/categories/<name>')
def get_products_by_categories(name: str) -> dict:
    return products_by_field('categories', name).__dict__

@app.route('/categories')
def get_categories() -> dict:
    return categories().__dict__

@app.route('/categories/<id>')
def get_category(id: int) -> dict:
    return categories_by_field('id', id).__dict__

@app.route('/pipeline/log')
def get_pipeline_log() -> dict:
    return pull_pipeline_log().__dict__

@app.route('/pipeline/refresh', methods=['POST'])
def pipeline_refresh() -> dict:
    return refresh_pipeline().__dict__

if __name__ == "__main__":
    app.run(debug=True)