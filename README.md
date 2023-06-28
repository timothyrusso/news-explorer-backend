#  news-explorer-backend

This repository contains the backend API of the NewsExplorer project that features user authorization and user registration and handles articles and users.

- Endpoint of the API: https://news-explorer-cc5g.onrender.com/

- Endpoint for the live project: https://newsexplorer23.netlify.app/

## Running the project  

`git clone repository_url` — to clone the repository locally.

`npm install` — to install all the dependencies.

`npm run start` — to launch the server.  

`npm run dev` — to launch the server with the hot reload feature.

*Note: the project will run in the development mode, the production mode need the .env file.*

## API endpoints

`POST  /signup` — Register new user

`POST  /signin` — Login the user

`GET  /users/me` — Get current user info

`GET  /articles` — Get current user saved articles

`POST  /articles` — Save user article

`DELETE  /articles/:articleId` — Delete user article
