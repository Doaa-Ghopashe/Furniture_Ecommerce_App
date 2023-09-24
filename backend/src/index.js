// require('dotenv').config();

const express = require('express'),

user = require('./routes/user')

PORT = process.env.PORT || 4000,

app = express();

app.use(express.json())

app.use('/user',user)
// app.get('/',(req,res)=>{res.send("<h1>Doaa Adel Ghopashe mohamed de</h1>")});

app.listen(PORT,()=>{console.log("listening on port")});


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