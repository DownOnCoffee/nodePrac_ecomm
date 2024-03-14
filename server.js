const express = require('express');
const app = express();
const db=require('./db');
const bodyParser=require('body-parser');
const Customerroutes=require('./routes/Customerroutes');
const CatalogueRoutes=require('./routes/CatalogueRoutes');
const passport = require('./auth');
require('dotenv').config();

app.use(bodyParser.json());

//passport middleware func for authentication
app.use(passport.initialize());
const localAuthMiddleware = passport.authenticate('local', {session: false});

// Apply Passport local authentication middleware to any route you want
app.get('/', function (req, res) {
    res.send('Welcome to Zara');
});


app.use('/customer',Customerroutes);
app.use('/catalogue',CatalogueRoutes);

const port=process.env.PORT || 3000;
app.listen(port);