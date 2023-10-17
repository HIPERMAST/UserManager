# User Manager


### Author
Daniel Andrés Bernal Cáceres


## Backend

The project backend is made using Python.
The database was created using SQLAlchemy.
The framework for creating the RESTful API is FastAPI.
The backend needs to be running for the frontend to work.

### Dependencies

* Python installed on your machine.
* FastAPI framework for creating the RESTful API. You can install it using pip: pip install fastapi.
* SQLAlchemy for interacting with the database. Install it using: pip install SQLAlchemy.
* Uvicorn for running the FastAPI application. Install it with: pip install uvicorn.

### `uvicorn main:app --reload`

Runs the app\
Open [http://localhost:8000/docs](http://localhost:8000/docs) to view it in the browser.

The page will reload if you make edits.\
The page shows all the available CRUD options for the backend.
Using the "Try it out" option for each operation modifies the database.db file.

### Models

There are 2 entities:

Admin:
*   id
*   email
*   hashedPW
*   users (relation with User)

User:
*   id
*   avatar
*   email
*   firstName
*   lastName
*   position
*   skills
*   adminId (relation with Admin)

## Frontend

The project frontend is made using React.
The styles of each component are modified in their respective .css.
The skills chart uses the Chart.js library.

### Dependencies

* Node.js and npm installed on your machine.
* React library for building the frontend. You can create a new React project with the command: npx create-react-app my-app or clone an existing project.
* Once you have the project, you can run it using npm start.

### `npm start`

Runs the app\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.