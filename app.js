const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyparser = require('body-parser');
const path = require('path');
const connectDB = require('./server/database/connection');

const app = express();

//PORT configuration
dotenv.config({path: 'config.env'});
const PORT = process.env.PORT||8080;

//connecting to database
connectDB();

//logging the requests made to the server
app.use(morgan('tiny'));

//parsing request using body_parser
app.use(bodyparser.urlencoded({extended: true}));


//set view engine
app.set("view engine","ejs");

//load assets
app.use('/css',express.static(path.resolve(__dirname,"assets/css")));
app.use('/img',express.static(path.resolve(__dirname,"assets/img")));
app.use('/js',express.static(path.resolve(__dirname,"assets/js")));



//load routers
app.use('/',require('./server/routes/router'))



//setting the server with the port
app.listen(PORT, ()=>{
    console.log(`Server is running at port no ${PORT}`);
})


