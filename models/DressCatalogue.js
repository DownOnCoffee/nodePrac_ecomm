const mongoose=require('mongoose');
const catalogueschema=new mongoose.Schema({
    
    dressType:{
        type:String,
        required:true
    },
    
    price:{
        type:Number,
         required:true
    },
    color:{
        type:String,
        required:false,

    },
    gender:{
        type:String,
        enum:['unisex','men','female'],
        default:[]
    },
    material:{
        type:String,
        enum:['cotton','jute','wool','synthetic'],
        default:['cotton']
    }

});

const DressCatalogue=mongoose.model('DressCatalogue',catalogueschema);
module.exports={DressCatalogue};