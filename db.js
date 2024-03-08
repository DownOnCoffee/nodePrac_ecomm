const mongoose=require('mongoose');
const db=mongoose.connection;
require('dotenv').config();
const dburl=process.env.MONGODB_URL;
mongoose.connect(dburl);

db.on('connected', () => {
    console.log('someone connected!');
  });

db.on('error',()=>{
    console.log("mongo db error");
})

module.exports={db};