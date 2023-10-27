/* const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const dbConnection =  process.env.NOSQL_URI
mongoose.connect(dbConnection, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function () {
    console.log("Connected to MongoDB");
});

module.exports = db; */

const { Pool } = require("pg"); //import Pool from pg to connect to the database and execute queries
const dotenv = require("dotenv"); //import dotenv to use environment variables

dotenv.config(); //use environment variables

const pool = new Pool({ //create a new pool to connect to the database

    connectionString: process.env.DATABASE_URL, //use the database url from environment variables
    ssl: {
        rejectUnauthorized: false, //do not reject unauthorized connections
    },
});

pool.connect(function(err) {//connect to the database
    if (err) {
        console.error('Error connecting to database:', err);
    } else {
        console.log('Connected to database');
    }
});

module.exports = pool;