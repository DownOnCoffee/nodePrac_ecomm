const mongoose=require('mongoose');
const dburl="mongodb://localhost:27017/e-comm";
mongoose.connect(dburl);
const db=mongoose.connection;
db.on('connected', () => {
    console.log('someone connected!');
  });

db.on('error',()=>{
    console.log("mongo db error");
})

module.exports={db};