require('dotenv').config();

const express = require('express'),

PORT = process.env.PORT || 4000,

app = express();

app.get('/',(req,res)=>{res.send("<h1>Hello World</h1>")});

app.listen(PORT,()=>{console.log("listening on port")});

