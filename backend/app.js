const express=require("express");
const cookieParser=require("cookie-parser");
const errormiddleware=require("../backend/middleware/error");
const bodyParser=require("body-parser");
const path=require("path")
const fileUpload=require("express-fileupload")
const app=express();
if(process.env.NODE_ENV!=="PRODUCTION"){

    require("dotenv").config({path:"backend/config/config.env"})
}
const User=require("./routes/userroutes")
const order=require("./routes/orderroute")
const payment=require("./routes/paymentRoute")
app.use(cookieParser())
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(fileUpload())
const products=require("./routes/productroute")
app.use("/api/v1",products)
app.use("/api/v1",User)
app.use("/api/v1",order)
app.use("/api/v1",payment)
app.use(express.static(path.join(__dirname,"../frontend/my-react-app/build")))
app.get("*",(req,res)=>{
    res.sendFile(path.resolve("../frontend/my-react-app/build/index.html"))
})
app.use(errormiddleware)
module.exports=app