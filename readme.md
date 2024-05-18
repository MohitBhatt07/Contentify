# Headless CMS with CRUD Functionality

This project is a basic headless Content Management System (CMS) that allows users to define entities with custom attributes, create database schemas dynamically, and perform CRUD (Create, Read, Update, Delete) operations on those entities.

## Features

- **Dynamic Entity Creation**: Define new entities with custom attributes and data types from the frontend interface.
- **Automatic Database Schema Generation**: When a new entity is created, the application automatically generates the corresponding table schema in the PostgreSQL database based on the provided attributes.
- **CRUD Operations**: Perform CRUD operations on each entity, including creating, reading, updating, and deleting records.
- **User-Friendly Interface**: The frontend provides a intuitive interface for managing entities and performing CRUD operations.
- **Modular Design**: The project follows a modular and extensible design, separating concerns between the frontend, backend, and database layers.

## Technologies Used

- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL

## Getting Started

Follow these steps to set up and run the project locally:

### Prerequisites

- Node.js (v14 or later)
- PostgreSQL (v12 or later)

### Backend Setup

1. Navigate to the backend directory: `cd backend`
2. Install dependencies: `npm install`
3. Create a `.env` file in the backend directory and add the following environment variables:
    - DB_USER=your_postgres_user
    - DB_PASSWORD=your_postgres_password
    - DB_HOST=your_postgres_host
    - DB_PORT=your_postgres_port
    - DB_NAME=your_postgres_database
    - BASE_URL = your_frontend_url
    - PORT = 8000
4. Start the backend server: `npm start`

### Frontend Setup

1. Navigate to the frontend directory: `cd frontend`
2. Install dependencies: `npm install`
3. Start the frontend development server: `npm start`

### Database Configuration

1. Make sure you have PostgreSQL installed and running.
2. Create a new database with the name specified in the `DB_NAME` environment variable.
3. The application will automatically create the required tables based on the entities defined through the frontend interface.

## Usage

1. Access the frontend application at `http://localhost:5173.
2. Use the provided interface to define new entities with custom attributes and data types.
3. Once an entity is created, you can perform CRUD operations on that entity, such as creating, reading, updating, and deleting records.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.