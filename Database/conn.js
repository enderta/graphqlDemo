const mongoose=require('mongoose');
const dotenv = require("dotenv");
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://ender:ender@ender.9e2zipx.mongodb.net/?retryWrites=true&w=majority";
dotenv.config();


async function connect() {
    try {
        await mongoose.connect('mongodb+srv://ender:ender@ender.9e2zipx.mongodb.net/User?retryWrites=true&w=majority', {
            //mongodb+srv://ender:ender@ender.9e2zipx.mongodb.net/?retryWrites=true&w=majority
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Successfully connected to MongoDB.');
    } catch (err) {
        console.error('Error connecting to MongoDB: ', err);
    }
}

module.exports = { connect };
