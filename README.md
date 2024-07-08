# Expense Tracker

This project is a simple expense tracker application with a separate front end and back end.

## Backend Setup
There are 2 ways to setup the backend server
- Either you can go with basic NodeJS and MySql installation and set up the database and connection URL using env variables.
- Or you can use docker commands and docker-compose to run a single container with a backend and database

### Prerequisites for Basic setup
- Node.js installed
- Mysql installed and running

### Prerequisites for Docker-based setup
- Docker CLI and Docker hub installed

### Setting up the backend using basic setup (Without Docker)
1. Fork the repo
2. ```
   git clone https://github.com/{your-forked-repo-name}/expense-tracker.git
   ```
3. Navigate to the `backend` directory: `cd backend`
4. Install dependencies: `npm install`
5. ```
   cp .env.example .env
   ```
6. Update the DATABASE_URL environment variable in the `.env` file
7. ```
   npm run start
   ```

### Setting up the backend using basic setup (Using Docker)
1. Fork the repo
2. ```
   git clone https://github.com/{your-forked-repo-name}/expense-tracker.git
   ```
3. Navigate to the `backend` directory: `cd backend`
4. ```
   run docker-compose build
   ```
5. ```
   run docker compose-up -p expense_tracker_be up -d
   ```
6. Check the docker hub, in some cases the backend application container doesn't start
7. If the backend application container hasn't started properly run `docker-compose -p expense_tracker_be restart`
   
