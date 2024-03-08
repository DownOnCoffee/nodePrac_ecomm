const mongoose=require('mongoose');
const personschema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{ 
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phoneNumber:{
        type:Number,
        required:true
    },
    address:{
        type:String,
        required:false,
    },
    gender:{
        type:String,
        enum:['female','male','other']
    }
});
const Customer=mongoose.model('Customer',personschema);
module.exports={Customer};