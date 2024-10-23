const express =  require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const globalErrorHandler = require('./errorhandlers/GlobalErrorHandler');

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
const healthTipRoute = require('./routes/HealthTipRoute');
const ChatbotRoute = require('./routes/ChatbotRoute');


//========================================================
app.use('/api/v1/user', userRoute);
app.use('/api/v1/healthTip', healthTipRoute);
app.use('/api/v1/chatbot', ChatbotRoute);




//========================================================
app.use((req, res, next) => {
    /*res.status(404).json({
        success: false,
        message: "Page not found"
    });*/
    const error = new Error('Page not found');
    error.status = 404;
    next(error);
});
app.use(globalErrorHandler);