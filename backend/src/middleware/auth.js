const jwt = require('jsonwebtoken');

const verifyToken = (req,res,next)=>{
    //search for the token in the comming request
    const token = req.body?.token || req.headers?.['x-access-token'] || req.query?.token;
    //if token doesn't exist in the request
    if(!token){
        return res.status(403).send('please login');
    }
    try{
        //need to decode this token 
        let decodedToken  =jwt.verify(token,process.env.SECRET_KEY);
        req.user = decodedToken;
    }catch(err){
        return res.status(400).send('Invalid Credentials');
    }
    return next();
}

module.exports = verifyToken;
