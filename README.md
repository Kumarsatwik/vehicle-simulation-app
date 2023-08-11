# vehicle-simulation-app

To run the vehicle simulation application locally:

Clone the GitHub repository at https://github.com/Kumarsatwik/vehicle-simulation-app.git

In your terminal, navigate into the project folder:

cd vehicle-simulation-app

Install the project dependencies by running:

npm install

Start the React development server:

npm start

In a new terminal window, install json-server globally:

npm install -g json-server

Navigate into the vehicle-app folder again and start the json-server:

json-server --watch db.json --port 8080

Open your web browser and go to http://localhost:3000 to view the running application.

The React app will be served on port 3000 and the json-server API will be available on port 8080.
