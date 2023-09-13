const mongoose = require("mongoose")
const productschema = new mongoose.Schema({
    name: {
        type:String,
        required: [true, "Please Enter your Name"]
    },
    description: {
        type:String,
        required: [true, "Please Enter your description"]
    },
    price: {
        type:Number,
        required: [true, "Please Enter your price"],
        maxLength: [8, "Price cannot exceed 8 characters"]
    },
    ratings: {
        type:Number,
        default:0
    },
    images: [
        {
            public_id: {
                type:String,
                required: true
            },
            url: {
                type:String,
                required: true
            }
        }
    ],
    category: {
        type:String,
        required: [true, "please Enter product category"]
    },
    Stock: {
        type:Number,
        default:1,
        maxlength: [4, "stock can't exceed 4 characters"]

    },
    numberofreviews: {
        type:Number,
        default: 0
    },
    reviews: [
        {
            user:{
                type:mongoose.Schema.ObjectId,
                ref:"User",
                required:true
        
            },
            name: {
                type:String,
                required: true
            },
            rating: {
                type:Number,
                required: true
            },
            comment: {
                type:String,
            }
        }
    ],
   
    createdat:{
        type:Date,
        default:Date.now
    }
})
module.exports=mongoose.model("product",productschema)