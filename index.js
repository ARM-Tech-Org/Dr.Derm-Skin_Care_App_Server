import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';

import connectMongoDB from './db/connectDB.js';

dotenv.config();

const port = process.env.PORT | 5000;

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

try {
    connectMongoDB();
    app.listen(port, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
    });
} catch (error) {
    console.log('Error connecting to MongoDB: ', error.message);
}