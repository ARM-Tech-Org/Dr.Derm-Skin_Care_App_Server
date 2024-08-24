const userSchema = require("../models/UserSchema");
const bcrypt = require('bcrypt');
const salt = 10;
const jsonwebtoken = require('jsonwebtoken');

const register = (req, resp) =>{

    userSchema.findOne({email: req.body.email}).then(result=>{
        if(result==null){
            bcrypt.hash(req.body.password,salt,function (err,hash){
                if(err){
                    resp.status(500).json(err);
                }
                const user = new userSchema({
                    name: req.body.name,
                    password: hash,
                    email: req.body.email,
                    age: req.body.age,
                    gender: req.body.gender,
                    subscriptionType: req.body.subscriptionType,
                    paymentInfo: {
                        cardNumber: req.body.cardNumber,
                        expiryDate: req.body.expiryDate,
                        cvv: req.body.cvv
                    }
                });
                user.save().then(result=>{
                    const payload={
                        email: result.email,
                        userType: result.subscriptionType
                    }
                    const secretKey = process.env.SECRET_KEY;
                    const expiresIn='12h';
                    const token = jsonwebtoken.sign(payload,secretKey,{expiresIn});

                    resp.status(200).json(result);
                }).catch(error=>{
                    resp.status(500).json(error);
                })
            })
        }else{
            resp.status(400).json({message: 'User already exists'});
        }
    });
}

const login = (req, resp) =>{
    userSchema.findOne({email: req.body.email}).then(result=>{
        if(result==null){
            resp.status(404).json({message: 'User not found'});
        }else{
            bcrypt.compare(req.body.password,result.password,function(err,hash){
                if(err){
                    resp.status(500).json(err);
                }
                if(hash){
                    const payload={
                        email: result.email,
                        userType: result.subscriptionType
                    }
                    const secretKey = process.env.SECRET_KEY;
                    const expiresIn='12h';
                    const token = jsonwebtoken.sign(payload,secretKey,{expiresIn});

                    resp.status(200).json({message: 'Login successful', token: token});
                }else{
                    resp.status(400).json({message: 'Incorrect password'});
                }
            })
        }
    })
}

module.exports = {login,register}