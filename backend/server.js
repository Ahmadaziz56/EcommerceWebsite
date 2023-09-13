const app= require("./app")
const cloudinary =require("cloudinary")
const connectdatabase=require("./config/database")
process.on("uncaughtException",err=>{
    console.log(`error:${err.message}`);
    console.log("server is down")
        process.exit(1);    
})
if(process.env.NODE_ENV!=="PRODUCTION"){

    require("dotenv").config({path:"backend/config/config.env"})
}
connectdatabase();
cloudinary.config({
    cloud_name:process.env.CLOUNDINARY_NAME,
    api_key:process.env.CLOUNDINARY_API_KEY,
    api_secret:process.env.CLOUNDINARY_API_SECRET,

})

const server =app.listen(process.env.port,()=>{
    console.log("server is connected")
})
process.on("unhandledRejection",err=>{
    console.log(`error:${err.message}`);
    console.log("server is down")
    server.close(()=>{
        process.exit(1);    
    })
})

