const {Router}= require('express');
const authMiddleware= require("../middleware/auth.middleware.js")
const transactionController =require('../controller/Transaction.controller.js')


const transactionRoutes = Router();

/**
 * -POST /api/transaction/
 * -create new transaction
 */

transactionRoutes.post("/",authMiddleware.authMiddleware,transactionController.createTransaction)


module.exports=transactionRoutes