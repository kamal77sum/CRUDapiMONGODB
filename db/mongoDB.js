const MongoClient = require('mongodb').MongoClient;
require('dotenv').config()

const url = process.env.url

class Connection {
    static async open() {
        if (this.client) return this.client;
        this.client = await MongoClient.connect(url);
        return this.conn;
    }
}

Connection.conn = null;
Connection.url = url;

module.exports = { Connection };