const jwt = require('jsonwebtoken');
const secretKey=process.env.SECRET_KEY;

const verifyToken= (req,res,next)=>{

    let token = req.headers.authorization;
    if(!token){
    token = token.slice(7);
    console.log(token);
        return res.status(403).json({'error':'token is missing!'});
    }
    jwt.verify(token, secretKey,(err,decoded)=>{
        if(err){
            const error = new Error('Token is invalid');
            error.statusCode = 401;
            error.stausMessgae = "Token is invalid";
            return error;
        }
        console.log(decoded);
       next();
    });
}

module.exports=verifyToken;