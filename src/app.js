const express =require("express")
const cookieParser =require("cookie-parser")

const authrouter =require("./routes/auth.routes.js")


const app=express()

app.use(express.json())  //to use body
app.use(cookieParser())

app.use("/api/auth",authrouter)



module.exports=app