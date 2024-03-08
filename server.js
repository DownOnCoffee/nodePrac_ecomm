const express = require('express');
const app = express();
const db=require('./db');
const bodyParser=require('body-parser');
const Customerroutes=require('./routes/Customerroutes');
const CatalogueRoutes=require('./routes/CatalogueRoutes');

app.use(bodyParser.json());


app.get('/pizza', function (req, res) {
    res.send('will serve you pizza');
});

app.use('/customer',Customerroutes);
app.use('/catalogue',CatalogueRoutes);




app.listen(3000);