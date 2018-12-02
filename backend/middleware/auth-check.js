const jwt = require('jsonwebtoken');

module.exports = (req,res,next) => {
    try{
        const token = req.headers.authorization.split(" ")[1];  //authorization = Authorization i.e case insensitive which is set usinh auth interceptor from client side(angular) for each http request
        jwt.verify(token,'AKV_LONG_WEB_TOKEN_KEY');
        next();
    }catch(err){
        res.status(401).json({ message: "Auth failed!" });
    }
    
}