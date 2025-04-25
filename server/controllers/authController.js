import User from "../models/userModel.js";

import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({ username, email, password: hashedPassword });

  try {
    await newUser.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    next(error);
  }
};


export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin || false, // in case you store this flag
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" } // 7 days
    );

   
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
      })
      .status(200)
      .json({message:"login successfull"});

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to login!" });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie('token', {
      httpOnly: true,
      secure: true,
      sameSite: 'strict'
    });
    
    res.status(200).json({ 
      success: true,
      message: 'User has been logged out' 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: 'Error logging out',
      error: error.message 
    });
  }
};

export const google= async(req,res,next)=>{
  try {
    const user= await User.findOne({email:req.body.email});
    if(user){
      const token= jwt.sign({id:user._id},process.env.JWT_SECRET);
      const {password:hashedPassword, ...rest}= user._doc;
      const expiryDate= new Date(Date.now()+3600000); // 1 hr

      res.cookie("token",token,{
        httpOnly:true,
        expires: expiryDate
      })
      .status(200).json(rest);
    }
    else{
      const generatedPassword= Math.random().toString(36).slice(-8)+ Math.random().toString(36).slice(-8);

      const hashedPassword= await bcrypt.hash(generatedPassword,10);
      const newUser= new User({
        username: req.body.name.split(" ").join("").toLowerCase()+
        Math.random().toString(36).slice(-8),
        email: req.body.email,
        password: hashedPassword,
        profilePicture: req.body.picture
      });

      await newUser.save();
      const token= jwt.sign({id: newUser._id}, process.env.JWT_SECRET);
      const {password:hashedPassword2, ...rest}= newUser._doc;
      const expiryDate= new Date(Date.now()+3600000);

      res.cookie("token",token,{
        httpOnly:true,
        expires: expiryDate
      })
      .status(200).json(rest);
    }
  } catch (error) {
       next(error);
       console.log(error)
  }
}
