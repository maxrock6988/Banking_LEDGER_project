const express =require("express")
const cookieParser =require("cookie-parser")


const app=express()

app.use(express.json())  //to use body
app.use(cookieParser())


/**
 * -Routes required
 */
const authrouter =require("./routes/auth.routes.js")
const accountrouter=require("./routes/account.routes.js")
const transactionrouter=require("./routes/transaction.routes.js")

/**
 * -use Routes
 */
app.use("/api/auth",authrouter)
app.use("/api/accounts",accountrouter)
app.use("/api/transaction",transactionrouter)



module.exports=app