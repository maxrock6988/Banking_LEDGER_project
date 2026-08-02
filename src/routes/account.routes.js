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


/**
 * -GET /api/accounts/
 * -get all account of the logged in user
 * -protected Routes
 */
router.get("/",authmiddleware.authMiddleware,acccountController.GetAccountController)

/**
 * -GET /api/accounts/balance/:accountId
 */
router.get("/balance/:accountId",authmiddleware.authMiddleware,acccountController.GetAccountBalanceController)


module.exports=router