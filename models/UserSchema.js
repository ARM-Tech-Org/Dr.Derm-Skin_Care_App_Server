const mongoose = require("mongoose");


const UserSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            required: true
        },
        password:{
            type:String,
            required: true
        },
        email:{
            type:String,
            required: true
        },
        age:{
            type:Number
        },
        gender:{
            type:String
        },
        subscriptionType:{
            type:String,
            required: true,
            enum: ['free', 'paid'] // Enum definition
        },
        paymentInfo:{
            cardNumber:{
                type:String
            },
            expiryDate:{
                type:Date
            },
            cvv:{
                type:String
            }
        }
    },
    {timeStamps:true}
);

module.exports = mongoose.model('user',UserSchema);