const express = require('express');
const dotenv = require('dotenv')
const morgan =require('morgan')
const connectDB= require('./config/db')
const colors = require('colors')
const errorhandler= require('./middleware/err')
//load env variables 
dotenv.config({path:'./config/config.env'});

//connect to database 
connectDB()


//route files
const bootcamps = require('./routes/bootcamps')




const app = express();

//body parser 
app.use(express.json());



//dev looging middleware
if(process.env.NODE_ENV === 'development '){
    app.use(morgan('dev'))
}


//mount routes 

app.use('/api/v1/bootcamps1',bootcamps)

app.use(errorhandler);


const PORT = process.env.PORT || 5000



 const server =app.listen(
    PORT, console.log(`server runningin port ${PORT}`.yellow.bold)
);

//handle unhandeled promise  rejections

process.on('SIGABRTunhandled rejection ',(err,promise)=>{
    console.log(`errr: ${err.message}`.red);
    //close server and exit process 
    server.close(()=>process.exit(1))
});

 