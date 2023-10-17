require('dotenv').config();

require('cors');

const express = require('express'),

//to use error handling instead of try catch
    errorHandling = require('./middleware/errorHandling'),

    cors = require('cors'),

    user = require('./routes/user'),

    product = require('./routes/product'),

    PORT = process.env.SERVER_PORT,

    Mongodb = process.env.MONGODB_URL,

    app = express(),

    mongoose = require('mongoose');

app.use(cors());

mongoose.connect(Mongodb, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => console.log("DB connected successfully "))
    .catch((err) => console.error(err));

app.use(express.json());

app.use(express.static('public'));

app.use('', user);

app.use('/product', product);

app.use(errorHandling);

app.listen(PORT, (err) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log(`listening on port ${PORT}`)
});
