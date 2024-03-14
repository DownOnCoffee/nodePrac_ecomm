const jwt=require('jsonwebtoken');

//function to verification through token
const jwtAuthMiddleware= async (req,res,next)=>{

    const token=req.headers.authorization.split(' ')[1];
    if (!token){res.status(401).json({error:"Token not found"})}; //if no token found

    try{
        const decoded=jwt.verify(token,process.env.SECRET_KEY);
        req.user=decoded; //we are adding a user element to request body and decoded holds user info that was extraced from the token
        next();

    }catch(err){
        console.log(err);
        res.send(500).status("error in token authorization");
    }   
};

//to generate token after login
const generateToken=(userdata)=>{
    const token=jwt.sign(userdata,process.env.SECRET_KEY);
    return token;

};
module.exports= {generateToken,jwtAuthMiddleware};