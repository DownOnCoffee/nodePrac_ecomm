const express=require('express');
const router=express.Router();
const {Customer}=require('./../models/Customer');
const {generateToken,jwtAuthMiddleware}=require('./../jwt') ;

router.get('/',jwtAuthMiddleware,async (req,res)=>{
    try{
        const data=await Customer.find();
        res.send(data);
        
    }catch(err){
        console.log(err);
        res.status(500).json("internal sever error");
    }

});

// router.get('/:gender',async (req,res)=>{
//     try{
//         const Gender=req.params.gender;
//         if (Gender=='female' || Gender=='male' || Gender=='other'){
//             res.send(Customer.find(Gender));
//         }
//         else{
//             res.status(404).send("invalid gender request");
//         }
//     } catch(err){
//         console.log(err);
//         res.status(500).json("internal sever error");
//     }

// });

router.post('/signup',async (req,res)=>{
    try{
        const data=req.body;
        const newcustomer= new Customer(data);
        const savedperson=await newcustomer.save();
        const payload={
            id:savedperson.id,
            username:savedperson.username
        }
        const gentoken=generateToken(payload);
        console.log("yy");
        console.log(gentoken,"xx");
        res.status(200).json({response:savedperson,"token":gentoken});

    }catch(error){
        console.log(error);
        res.status(500).json("Internal server error");
    }
});

router.post('/login',async (req,res)=>{

    const username=req.body.username;
    const password=req.body.password;
    const user=await Customer.findOne({username});
    if (!user){
        return res.status(401).send("Username doesn't exist");
    }
    const isMatch = await user.comparepassword(password);
    if (isMatch){
        const payload={id:user.id,username:user.username};
        const gentoken=generateToken(payload);
        console.log(gentoken);
        return res.status(200).send("successful login");
    }  
    else{
        return res.status(401).send( 'Incorrect password.' );
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

router.get('/getprofile',jwtAuthMiddleware,async (req,res)=>{
    try{
        const userdata=req.user;
        const userid=userdata.id;
        const data=await Customer.findById(userid);
        res.status(200).json({data});

    }
    catch(err){
        console.log(err);
        res.status(500).json({error:"internal server error"});
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

