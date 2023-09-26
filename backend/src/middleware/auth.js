const auth = (req,res,next)=>{
    isLoggedIn = false
    if(isLoggedIn){
        return next();
    }
    console.log("please login");
    next(new Error('please login'));
}

module.exports = auth;