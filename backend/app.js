const express = require('express');
const dotenv = require('dotenv');
dotenv.config({ path:'./config.env'})
require('./db/db-conn.js');
const cors = require('cors');

// Variables
const app = express();
const port = process.env.PORT;

// CORS issue
app.use(cors({ credentials: true, origin: true }))
// Middleware
app.use(express.json());
// link routes 
app.use(require('./routes/reservation'));

app.listen(port, () => {
    console.log(`server is running at port# ${port}.....`);
})