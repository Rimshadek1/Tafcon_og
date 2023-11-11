const { MongoClient } = require("mongodb");
require('dotenv').config();
// const mongoUrl = process.env.mongoUrl;
const state = {
    db: null,
};
mongoUrl = 'mongodb+srv://rimshithabshi1:0e0jNOC4svPQFJd7@cluster0.hwklrno.mongodb.net/tafcon?retryWrites=true&w=majority'

// mongodb connection string
const url = mongoUrl;
// database name

// create a new mongodb client object
const client = new MongoClient(url);

// function to establish mongodb connection
const connect = async (cb) => {
    try {
        // connecting to mongodb
        await client.connect();
        // setting up database name to the connected client
        const db = client.db();
        // setting up database name to the state
        state.db = db;

        client.on('close', () => {
            console.log('MongoDB connection closed');
        });

        client.on('reconnect', () => {
            console.log('MongoDB reconnected');
        });

        // callback after connected
        return cb();
    } catch (err) {
        // callback when an error occurs
        return cb(err);
    }
}

// function to get the database instance
const get = () => state.db;

// exporting functions
module.exports = {
    connect,
    get,
};