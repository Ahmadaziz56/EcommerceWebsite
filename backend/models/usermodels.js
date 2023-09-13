const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")
const crypto=require("crypto")
const userschema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter your Name"],
        maxlength: [30, "Name can't exceed 30 Characters"],
        minlength: [5, "Name should have atleast 5 characters"]
    },
    email: {
        type: String,
        required: [true, "Please Enter your Email"],
        unique: true,
        validate: [validator.isEmail, "Please Enter  a valid Email"]
    },
    password: {
        type: String,
        required: [true, "Please Enter your Password"],
        minlength: [7, "Password Should be greater then 7 characters"],
        select:false
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    avatar:{
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    role:{
        type:String,
        default:"User"

    },
    resetPasswordToken:String,
    resetPasswordExpire:Date,
})
    userschema.pre("save",async function(next){
        if(!this.isModified("password")){
            next();
        }
        this.password= await bcrypt.hash(this.password,10)

    })
    userschema.methods.getJWTToken=function (){
        return jwt.sign({id:this._id},process.env.JWT_SECRET,{
            expiresIn:process.env.JWT_EXPIRE,
        })
    }
    userschema.methods.comparePassword=async function(password){
        return await bcrypt.compare(password,this.password)

    }
    userschema.methods.getresetpasswordtoken=function(){
        const resettoken=crypto.randomBytes(20).toString("hex")
        this.resetPasswordToken=crypto.createHash("sha256").update(resettoken).digest("hex")
        this.resetPasswordExpire=Date.now()+ 15*60*1000;
        return resettoken;
    }
    
module.exports=mongoose.model("User",userschema)
