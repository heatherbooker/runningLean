require('dotenv').config(); // Set env variables.
const pg = require('pg');
const DB_url = process.env.DB_URL;

const client = new pg.Client(DB_url);
client.connect();

function DBClient () {

};

module.exports = DBClient;
