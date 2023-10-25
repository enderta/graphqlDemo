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

const { Pool } = require("pg");
const dotenv = require("dotenv");

dotenv.config();

const pool = new Pool({

    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false,
    },
});

pool.connect(function(err) {
    if (err) {
        console.error('Error connecting to database:', err);
    } else {
        console.log('Connected to database');
    }
});

module.exports = pool;