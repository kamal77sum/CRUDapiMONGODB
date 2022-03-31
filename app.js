const express = require('express');
const app = express();
const routes = require('./routes/routes');
require('dotenv').config();
const { Connection } = require('./db/mongoDB');

app.use(express.json());
app.use('/api', routes)


const PORT = process.env.port || 3000;
const start = async() => {
    try {
        await Connection.open()
        app.listen(PORT, () => {
            console.log(`listening to ${PORT}...`);
        })
    } catch (error) {
        console.log(error, `error in listening to server`);
    }
}

start();
