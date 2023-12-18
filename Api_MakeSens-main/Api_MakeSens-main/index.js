const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv=require('dotenv')
const bodyParser = require('body-parser');

dotenv.config()


//start a new Express application
const app = express();

// connect to database
const PORT = 4000 || process.env.PORT;
require('./database/connect');


// middlewares
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('dev'));



// initialize routes
const ImageLabel =  require('./Controllers/ImageLabel/ImageLabel');



/**
 * user routes
 */
app.use('/Api/V1/export' , ImageLabel)
app.use('/Api/V1' , ImageLabel)



//PORT
app.listen(PORT, (error) =>{
    if(!error)
        console.log("Server is Successfully Running, and App is listening on port "+ PORT)
    else 
        console.log("Error occurred, server can't start", error);
    }
);