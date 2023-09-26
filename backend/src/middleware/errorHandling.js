let errorHandling = (err,req,res,next)=>{
    res.send(err.message);
    
}

module.exports = errorHandling;