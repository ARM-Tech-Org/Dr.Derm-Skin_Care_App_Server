const express =  require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const bodyParser= require('body-parser');

const connectMongoDB = require('./db/connectDB.js');


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

app.get("/api/v1/test", (req, res, next) => {
    res.status(200).json({
        success: true,
        message: "API Working"
    });
});

//=========================================================
const userRoute = require('./routes/UserRoute');



//========================================================
app.use('/api/v1/user', userRoute);