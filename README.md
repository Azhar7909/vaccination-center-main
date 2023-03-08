# vaccination-center
 
The project builds RESTful APIs using Node.js, Express and Mongoose, ..

Manual Installation

Clone the repo:
git clone https://github.com/Azhar7909/vaccination-center-main.git
cd backend

Install the dependencies:
npm install

Set the environment variables:
cp .env.example .env
open .env and modify the environment variables

nodemon app.js
# or
npm run dev
Running in production:

# build
npm run build
# start
npm run prod
Environment Variables
The environment variables can be found and modified in the .env file.
# Port
PORT=5000

# URL of the Mongo DB
DB_CON_STRING=mongodb+srv://mahz:7909@cluster0.rqnufco.mongodb.net/?retryWrites=true&w=majority

API Endpoints
List of available routes:
reservation routes:
POST /create-reservation - Create a reservation
GET /reservation-list - Get all reservations
GET /reservation-list/:id - Get a reservation
PUT /update-reservation/:id - Update reservation
DELETE /delete-reservation/:id - Delete reservation
