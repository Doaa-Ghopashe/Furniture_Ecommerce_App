// require('dotenv').config();

const express = require('express'),

    errorHandling = require('./middleware/errorHandling'),

    user = require('./routes/user'),

    product = require('./routes/product'),

    PORT = process.env.PORT || 4000,

    app = express();

app.use(express.json());

app.use(express.static('public'));

app.use(errorHandling);

app.use('/user',user);

app.use('/product',product);

app.listen(PORT,(err)=>{
    if(err){
        console.error(err);
        return;
    }
    console.log("listening on port 4000")
});


// let http = require('http');
// let PORT = process.env.PORT || 4000;

// let server = http.createServer();

// server.listen(PORT,(err)=>
// !err ? console.log("the server listen to the port 4000"):console.log("the server is down"));

// server.on("request",(req,res)=>{
//     if(req.method == 'GET'){
//         res.end("<h1>Hello server is open</h1>");
//     }
// })