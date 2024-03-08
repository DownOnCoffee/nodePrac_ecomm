const express=require('express');
const router=express.Router();
const {DressCatalogue}=require('./../models/DressCatalogue');

router.post('/',async function(req,res){
    try{
        const data=req.body;
        const newcatalogue=new DressCatalogue(data);
        const savedcatalogue= await newcatalogue.save();
        res.status(200).json(savedcatalogue);
        console.log("catalogue info saved");

    }catch(err){
        console.log(err,"error in saving catalogue info");
        res.status(500).json("Internal server error");

    }   
});

router.get('/',async (req,res)=>{
    try{
        const data=await DressCatalogue.find();
        res.send(data);
        console.log("data sent successfully");

    }catch(err){
        console.log(err);
        res.status(500).json("internal sever error");
    }

});
module.exports = router;