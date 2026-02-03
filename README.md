# Best Buy Listings

A full-stack web application displaying Best Buy product listings filtered by product category, including a data pipeline and log history.

Built as an independent project centered on exposure to new areas of web development in frontend and app deployment, while leveraging existing backend skills.

## Live Demo
https://bestbuylistings.up.railway.app/

## Project Goals
- Build and deploy a simple application using Railway
- Strengthen existing backend skills
- First exposure to frontend development
- Learn PostgreSQL using existing SQL Server knowledge
- Implement environment variables for key security

## Tech Stack

### Frontend
- Typescript
- HTML/CSS
- Vite
- Vanilla router

### Backend
- Python
    - Flask
    - SQLAlchemy
    - Pandas
    - Tenacity
- PostgreSQL

## Architecture Notes
- Backend exposes Products, Categories, and Pipeline Log db tables via REST API endpoints
- Frontend fetches then renders tables and select dropdown upon user interaction

## Features
- Filter selection from product categories listed in db
- Dynamic product listing grid based on filter 
- Pipeline trigger to retrieve updated data from BestBuy API
- Pipeline log to show history

## Future Improvements
- Pipeline trigger frequency restrictions
- Scheduled task for Best Buy data pull
- Scheduled task for deleting outdated data
- Additional page ideas: Favorites

## Author
Damon Lawton
GitHub: https://github.com/lawtond15
LinkedIn: https://www.linkedin.com/in/damon-lawton-3b054626b/