const mongoose=require('mongoose');
const bcrypt = require('bcrypt');
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
    },
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
});

// When user wants to modify the password so to store it in database , we use a pre middleware function when user clicks save
personschema.pre('save',async function (next){
    try{
        const person=this;
        if (!person.isModified('password')){return next();}
        else{
            const salt=await bcrypt.genSalt(10); //generating salt
            const hashpassword=await bcrypt.hash(person.password,salt); //hashing the password+salt 
            person.password=hashpassword;
        }

    }catch(err){
        return err;
    }
});

//when user tries login in and you want to compare the entered password with the right password in database
personschema.methods.comparepassword = async function(candidatePassword){
    try{
        // Use bcrypt to compare the provided password with the hashed password
        const isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
    }catch(err){
        throw err;
    }
}
const Customer=mongoose.model('Customer',personschema);
module.exports={Customer};
