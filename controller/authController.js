import User from "../models/user.js";
import bcrpyt from "bcrypt";
import jwt from "jsonwebtoken";


const register = async(req, res)=>{
    try {

        const payload = req.body
        const password = await bcrpyt.hash(payload.password,10);
        payload.password = password;
        const user = await User.create(payload)

        return res.json({data:user, statusCode:200, message:"User registed sucessfully"})

    } catch (error) {
      return res.json({message:error.message,status:500});  
    }
}

const login = async(req,res)=>{
  try {
    const {email,password} = req.body;

    const user = await User.findOne({email:email});
    
    if(!user){
      return res.json({message:"User not found",statusCode:404})
    }

    const isMatch = await bcrpyt.compare(password,user.password);

    if(!isMatch){
      return res.json({message:"User not found", statusCode:404})
    }

    console.log(process.env.JWT_SECRET);

    const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{
      expiresIn: "1h",
    });

    return res.json({
      data:user,
      token:token,
      message:"User logged in sucessfully",
      status:200
    })

  } catch (error) {
    return res.json({message:error.message,status:500});    
  }
}

const allUsers = async (req,res)=> {
  const user= await User.find();

  return res.json({data:user});
}

export default {register, login,allUsers}