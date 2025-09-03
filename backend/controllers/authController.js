const jwt=require("jsonwebtoken")
const User=require("../models/User");

//Generating JWT token 

const generateToken=(id)=>{
    return jwt.sign({id

    },process.env.JWT_SECRET,{expiresIn:"1h"});

}

//register user 
exports.registerUser=async(req,res)=>{
    console.log("req.body:", req.body); // Add this line
    const {firstName,lastName,email,password,profileImageUrl}=req.body;

    if(!firstName||!lastName||!email||!password){
        return res.status(400).json({message:"Please fill all fields"});
    }

    try{
      //check if email already exsists
      const existingUser=await User.findOne({email});
      if(existingUser){
          return res.status(400).json({message:"Email already exists"});
      }
      //create a user
      const user = await User.create({ firstName, lastName, email, password, profileImageUrl });
        const token = generateToken(user._id);
        res.status(201).json({
            id: user._id,
            user,
            token
        });
    } catch (error) {
        res.status(500).json({ message: "Error registering user", error: error.message });
    }
};


//login user
exports.loginUser=async(req,res)=>{
  const {email,password}=req.body;
  if(!email||!password){
      return res.status(400).json({message:"Please fill all fields"});
  }
  try{
    const user =await User.findOne({email});
    if (!user||!await user.comparePassword(password)) {
        return res.status(400).json({message:"Invalid credentials"});
    } 
     res.status(200).json({
      id:user._id,
      user,
      token:generateToken(user._id)
     });
  }catch(error){
    res.status(500).json({ message: "Error logging in user", error: error.message });
  }
};

//userInfo
exports.getUserInfo=async(req,res)=>{
  try{
    const user=await User.findById(req.user.id).select("-password");

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  }catch(error){
    res.status(500).json({ message: "Error fetching user info", error: error.message });
  }
};

    