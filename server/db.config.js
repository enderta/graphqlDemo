const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const dbConnection =  'mongodb://localhost:27017/mydatabase';

mongoose.connect(dbConnection, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function () {
    console.log("Connected to MongoDB");
});

module.exports = db;