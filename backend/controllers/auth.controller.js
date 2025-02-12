import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
import generateToken from "../utils/generateToken.js"
export const signup =async (req, res)=>{
  try {
    const {fullname,username,gender,password,conformpassword} = req.body
    if(password != conformpassword){
      return res.status(400).json({error:"Password doesnot match"})
    }
    const user = await User.findOne({username})
    if(user){
      return res.status(400).json({error:"Username not exists"})
    }
    const salt = await bcrypt.genSalt(10)
    const hashedpassword = await bcrypt.hash(password, salt)
    const boyprofilepic = `https://avatar.iran.liara.run/public/boy?username=${username}`
    const girlprofilepic = `https://avatar.iran.liara.run/public/girl?username=${username}`

    const newUser = new User({
      fullname, username, password:hashedpassword, gender, profilepic: gender ==='male'? boyprofilepic : girlprofilepic
    })
    if(newUser){
      await newUser.save();
       generateToken(newUser._id, res)
    res.status(201).json({
      _id: newUser._id,
      fullname : newUser.fullname,
      username : newUser.username,
      profilepic : newUser.profilepic
    })
    }else{
      res.status(400).json({error:"Invalid User data"})
    }
  } catch (error) {
    console.log("Error in signup controller", error.message)
    res.status(500).json({error:"internal server error"})
  }
}
export const login = async(req, res)=>{
  try{
    const {username, password} = req.body
    const user = await User.findOne({username})
    const isPasswordCorrect = await bcrypt.compare(password , user?.password || "")
    if(!user || !isPasswordCorrect){
      return res.status(400).json({error:"Invalid username or password"})
    }
    generateToken(user._id, res)
    res.status(200).json(
      {_id: user._id,
      fullname: user.fullname,
      username: user.username,
      profilepic: user.profilepic}
    )
  }catch(error){
    console.log("Error in login ",error.message)
    res.status(500).json({error:"Internal server error"})
  }
}
export const logout = async(req, res)=>{
  try {
    res.cookie("jwt", "", {maxAge:0})
    res.status(200).json({message:"Logout successful"})
  } catch (error) {
    console.log("Error in logout controller",error.message)
    res.status(500).json({error:"Internal server error"})
  }
}