const express=require('express');
const router=express.Router();
const {Customer}=require('./../models/Customer');

router.get('/',async (req,res)=>{
    try{
        const data=await Customer.find();
        res.send(data);
        console.log("data sent successfully");


    }catch(err){
        console.log(err);
        res.status(500).json("internal sever error");
    }

});

router.get('/:gender',async (req,res)=>{
    try{
        const Gender=req.params.gender;
        if (Gender=='female' || Gender=='male' || Gender=='other'){
            res.send(Customer.find(Gender));
        }
        else{
            res.status(404).send("invalid gender request");
        }
    } catch(err){
        console.log(err);
        res.status(500).json("internal sever error");
    }

});

router.post('/',async (req,res)=>{
    try{
        const data=req.body;
        const newcustomer= new Customer(data);
        const savedperson=await newcustomer.save();
        res.status(200).json(savedperson);
        

    }catch(error){
        console.log(error);
        res.status(500).json("Internal server error");
    }
});

router.put('/:id',async (req,res)=>{
    try{
        const id=req.params.id;
        const updatetobe=req.body;
        const updated=await Customer.findByIdAndUpdate(id,updatetobe,{
            new:true,
            runValidators:true
        });
        

        if (!updated){
             res.status(404).send('id not found');
        }
        res.status(200).json(updated);

    }catch(err){
        console.log(err);
        res.status(500).json("Internal server error");

    }
    
});

router.delete('/:id',async (req,res)=>{
    try{
        const id=req.params.id;
       
        const deleteRes=await Customer.findByIdAndDelete(id);

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

