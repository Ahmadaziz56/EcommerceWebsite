const ErrorHander = require("../utils/errorhander");
const catchasyncerror  = require("../middleware/catchasyncerror");
const User = require("../models/usermodels");
const sendtoken = require("../utils/jwttoken");
const sendEmail=require("../utils/sendEmail")
const crypto=require("crypto")
const cloudinary=require("cloudinary")
exports.RegisterUser = catchasyncerror(async (req, res, next) => {
    const myCloud =await cloudinary.v2.uploader.upload(req.body.avatar,{
        folder:"avatars",
        width:150,
        crop:"scale",
        
    })
    const { name, email, password } = req.body
    const user = await User.create({
        name, email, password,
        avatar: {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
        }
    })
    sendtoken(user,201,res)
})
exports.loginUser = catchasyncerror(async (req, res, next) => {
    const { email, password } = req.body;
  
    // checking if user has given password and email both
  
    if (!email || !password) {
      return next(new ErrorHander("Please Enter Email & Password", 400));
    }
  
    const user = await User.findOne({ email }).select("+password");
  
    if (!user) {
      return next(new ErrorHander("Invalid email or password", 401));
    }
  
    const isPasswordMatched = await user.comparePassword(password);
  
    if (!isPasswordMatched) {
      return next(new ErrorHander("Invalid email or password", 401));
    }
  
    sendtoken(user, 200, res);
  });
exports.logout=catchasyncerror(async (req,res,next)=>{
    res.cookie("token",null,{
        expires:new Date(Date.now()),
        httpOnly:true
    })
    res.status(200).json({
        success:true,
        messege:"Logged out"
    })
})
exports.forgetPassword=catchasyncerror(async (req,res,next)=>{
    const user=await User.findOne({email:req.body.email})
    if(!user){
        return next(new ErrorHander("User not found",404))
    }
const resettoken= user.getresetpasswordtoken()
await user.save({validatebeforeSave:false})
const resetpasswordurl=`${req.protocol}://${req.get("host")}password/reset/${resettoken}`;
const message=`Your password reset token is  temp \n\n ${resetpasswordurl} \n\n if you have not requested this email then please ignore it`
try {
    await sendEmail({
        email:user.email,
        subject:"Ecommerce",
        message
    })
    res.status(200).json({
        success:true,
        message:`Email has been send to ${user.email} successfully`
        
    })
    
} catch (error) {
    user.resetPasswordToken=undefined
    user.resetPasswordExpire=undefined
    await user.save({validatebeforeSave:false})
    return next(new ErrorHander(error.message,500))
    
}
})
exports.getUserDetails=catchasyncerror(async(req,res,next)=>{
    const user=await User.findById(req.user.id);
    res.status(200).json({
        success:true,
        user
    })
   

})
exports.updatePassword=catchasyncerror(async(req,res,next)=>{
    const user=await User.findById(req.user.id).select("+password");
    const isPasswordMatched=await user.comparePassword(req.body.oldPassword)
    if(!isPasswordMatched){
        return next(new ErrorHander("old password is incorrect",400))
    }    
    if(req.body.newPassword!==req.body.confirmPassword){
        return next(new ErrorHander("password does not match",400))
    }    
    user.password=req.body.newPassword
    await user.save()
    sendtoken(user,200,res)
})
exports.updateProfile = catchasyncerror(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
      };
    
      if (req.body.avatar !== "") {
        const user = await User.findById(req.user.id);
    
        const imageId = user.avatar.public_id;
    
        await cloudinary.v2.uploader.destroy(imageId);
    
        const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
          folder: "avatars",
          width: 150,
          crop: "scale",
        });
    
        newUserData.avatar = {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        };
      }
    
      const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      });
    
      res.status(200).json({
        success: true,
      });
})
exports.getAllUsers = catchasyncerror(async (req, res, next) => {
    const users= await User.find()
    res.status(200).json({
        success:true,
        users
    })
})
exports.getSingleUser = catchasyncerror(async (req, res, next) => {
    const user= await User.findById(req.params.id)
    if(!user){
        return next(new ErrorHander(`user does not axist with Id:${req.params.id}`))
    }
    res.status(200).json({
        success:true,
        user
    })
})
exports.resetPasswordToken=catchasyncerror(async (req,res,next)=>{
    const resetPasswordToken=crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex")
    const user=await User.findOne({
        resetPasswordToken,
        resetPasswordExpire:{$gt:Date.now()}
    })
    if(!user){
        return next(new ErrorHander("Reset password token is invalid or expired",400))
    }
    if(req.body.password!==req.body.confirmPassword){
        return next(new ErrorHander("Passwords does not match",400))
    }
    user.password=req.body.password;
    user.resetPasswordToken=undefined
    user.resetPasswordExpire=undefined
    await user.save()
    sendtoken(user,200,res)

})
exports.updateUserRole = catchasyncerror(async (req, res, next) => {
    const newUserData = {
      name: req.body.name,
      email: req.body.email,
      role: req.body.role
    };
  
    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      });
       if(!user){
        return next(new ErrorHander(`user is not found with id:${req.params.id}`,400))
    }
    
      res.status(200).json({
        success: true,
      });
})
exports.deleteUser = catchasyncerror(async (req, res, next) => { 
    const user = await User.findById(req.params.id)
    if(!user){
        return next(new ErrorHander(`user is not found with id:${req.params.id}`,400))
    }
    const imageId = user.avatar.public_id;
    
        await cloudinary.v2.uploader.destroy(imageId);
    await user.deleteOne()
      res.status(200).json({
        success: true,
      });
})

