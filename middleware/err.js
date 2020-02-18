const ErrorResponse = require('../util/err_respons')

const errorhandler = (err,req,res,next)=>{
    let error = {...err} 

error.message = err.message;

    //log to console for dev 
    console.log(err);

//mongose bad object id 
if(err.name === 'CastError'){
    const message= ` resource  not found  with id ${err.value}`;
    error = new ErrorResponse(message,404)
}

// mongose duplicate key 

if(err.code === 11000){
    const message = "dublicate filed value  entered "
    error = new  ErrorResponse(message,400)
}

// mongoose validation error 
if(err.name === "ValidatorError"){
    const message = Object.values(err.error).map(val=>val.message )
    error = new ErrorResponse(message,400)
}


    res.status(error.statusCode || 500).json({
        success: false ,
        error :error.message || 'server Error'
    });
}

module.exports= errorhandler;
