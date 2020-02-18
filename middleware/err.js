const ErrorResponse = require('../util/err_respons')

const errorhandler = (err,req,res,next)=>{
    let error = {...err} 

error.message = err.message;

    //log to console for dev 
    console.log(err.stack.red);

//mongose bad object id 
if(err.name === 'CastError'){
    const message= ` resource  not found  with id ${err.value}`;
    error = new ErrorResponse(message,404)
}

    res.status(error.statusCode || 500).json({
        success: false ,
        error :error.message || 'server Error'
    });
}

module.exports= errorhandler;
