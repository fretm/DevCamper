const express = require('express');
const dotenv = require('dotenv')
//load env variables 

dotenv.config('./config/config.env');

const app = express();


const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`server runningin port ${PORT}`)
);
