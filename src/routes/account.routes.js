const express =require("express")
const authmiddleware=require("../middleware/auth.middleware.js")
const acccountController=require("../controller/account.controller.js")


const router =express.Router()




/**
 * -POST /api/accounts/
 * -create a new account
 * -protected Routes
 */

router.post("/",authmiddleware.authMiddleware,acccountController.createAccountController)




module.exports=router