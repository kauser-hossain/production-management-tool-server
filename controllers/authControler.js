const User=require('../models/User');
const bcryptjs=require("bcrypt")
const jwt=require('jsonwebtoken');
const jwtSecret=process.env.JWT_SECRET;
// রেজিস্ট্রেশন
exports.register=async(req,res)=>{
    const {username,password,email,role,officeIdCardNumber,phone,floor}=req.body;
    try {
       const existUser=await User.findOne({officeIdCardNumber});
         if(existUser){
              return res.status(400).json({success:false,message:'User already exists'});
         }
            const user=new User({username,password,email,role,officeIdCardNumber,phone,floor});
            await user.save();
            res.status(201).json({success:true,message:'User created successfully'});
    } catch (error) {
        res.status(500).json({success:false,error:error,message:'Server error'});
    }
}
// লগইন
exports.login=async(req,res)=>{
    const {officeIdCardNumber,password}=req.body;
    try {
        const user=await User.findOne({officeIdCardNumber}).select('+password');
        if(!user){
            return res.status(404).json({success:false,message:'User not found'});
        }
        const isMatch=await bcryptjs.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({success:false,message:'Invalid credentials'});
        }
        const token=jwt.sign({id:user._id},jwtSecret,{expiresIn:'1d'});
        res.status(200).json({success:true,token});
    }
    catch (error) {
        res.status(500).json({success:false,error:error,message:'Server error'});
    }
}
// প্রোফাইল
exports.getProfile = async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select("-password");
      if (!user) {
        return res.status(404).json({ message: "ইউজার পাওয়া যায়নি।" });
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: "কিছু ভুল হয়েছে।", error });
    }
  };
