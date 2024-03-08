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

router.delete('/:id',async (req,res)=>{
    try{
        const id=req.params.id;
        const deleteRes=await DressCatalogue.findByIdAndDelete(id);

        if (!deleteRes){
             res.status(404).send('id not found');
        }

        res.status(200).send('id deleted');

    }catch(err){
        console.log(err);
        res.status(500).json("Internal server error");

    }
    
});
module.exports = router;