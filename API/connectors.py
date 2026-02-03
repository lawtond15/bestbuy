import os
from flask import Flask, request, send_from_directory, abort
from flask_cors import CORS
import pandas as pd
from database.crud import *
from services.services import *

BASE_DIR = os.path.abspath(os.path.dirname(__file__))
PROJECT_ROOT = os.path.abspath(os.path.join(BASE_DIR, ".."))

app = Flask(
    __name__,
    static_folder=os.path.join(PROJECT_ROOT, "UI", "dist"),
    static_url_path="/assets"
)

CORS(app)

# API ROUTES

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

# FRONTEND ROUTES

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve_ui(path):
    """
    Serve the SPA:
    - If a real file exists in UI/dist, serve it
    - Otherwise return index.html so the client router can handle it
    """

    # 1. If the path is a real file, serve it
    full_path = os.path.join(app.static_folder, path)
    if path != "" and os.path.exists(full_path):
        return send_from_directory(app.static_folder, path)

    # 2. Otherwise serve index.html (SPA fallback)
    return send_from_directory(app.static_folder, 'index.html')

if __name__ == "__main__":
    app.run(debug=True)