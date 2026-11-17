"use strict";

// $ npm init -y
// $ npm i express dotenv
// $ echo PORT=8000 > .env
// $ npm i sequelize sqlite3

const express = require('express');
const app = express();

require('dotenv').config();
const PORT = process.env.PORT;

const cors = require('cors')
const corsOptions = {
  origin: ["http://localhost:5173",'https://todos-app-dhyz.onrender.com/'],
  methods: "GET, PUT, POST, DELETE, PATCH",
  allowedHeaders: ["Content-Type", "Authorization"],
  exposedHeaders: ["Content-Length", "X-Custom-Header"],
  credentials: true, // allow cookies/auth headers
  optionsSuccessStatus: 200,
  maxAge: 86400, // cache preflight for 1 day
};
app.use(cors(corsOptions))



// Parsed JSON body
app.use(express.json());


//* ROUTES

// HOME PATH
app.get('/', (req, res) => {
    res.status(200).send({
        success: true,
        message: 'TODO REST API'
    })
});

// Todo router
app.use(require('./src/routes/todo.router'));

//* NOT FOUND HANDLER
app.all('/*splat', (req, res) => {
    res.errorStatusCode = 404;
    throw new Error('Route is not found.');
});

//* ERROR HANDLER
app.use(require('./src/middlewares/errorHandler'));


app.listen(PORT, console.log('Listening on port:', PORT));