import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        username:{
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
            required: true
        },
        paymentInfo:{
            cardNumber:{
                type:String
            },
            expiryDate:{
                type:String
            },
            cvv:{
                type:String
            }
        }
    },
    {timeStamps:true}
);

const User = mongoose.model('User', UserSchema);

export default User;