const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');


const app = express();
dotenv.config();

app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));


/** WEB ROUTES */
const actionRoute = require('./routes/action.route');
app.use('/', actionRoute);

mongoose.connect(process.env.DB_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (err) { console.log(err) } else { console.log(`ServeAll Web successfully connected to MongoDB on ${new Date()}`) };
});

const server = app.listen(process.env.PORT_NUMBER);