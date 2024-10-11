const jwt = require('jsonwebtoken');
const secretKey=process.env.SECRET_KEY;



const authorize = (requiredRoles) => {

    return (req, res, next) => {
        let token = req.headers.authorization;
        console.log(token);
        token = token.slice(7);
        if(!token){
            return res.status(403).json({'error':'token is missing!'});
        }
        jwt.verify(token, secretKey,(err,decoded)=>{
            if(err){
                return res.status(401).json({'error':'token is invalid!'});
            }


            if (!decoded) {
                return res.status(401).json({ error: 'Unauthorized - User not authenticated' });
            }

            // Check if the user's role matches at least one of the required roles
            if (!requiredRoles.includes(decoded.userType)) {
                return res.status(403).json({ error: 'Forbidden - Insufficient permissions' });
            }
            next();

        });
    };
};

module.exports=authorize;
