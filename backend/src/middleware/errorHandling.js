const { appError } = require("../appError");

let errorHandling = (err,req,res,next)=>{

    if(err instanceof appError){
        return res.status(err.statusCode).json({
            message:err.message,
        })
    }
    return res.status(500).send('Something went wrong')
}

module.exports = errorHandling;