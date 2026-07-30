const transactionModel = require("../models/transaction.model.js");
const ledgerModel = require("../models/ledger.model.js");
const accountModel = require("../models/account.model.js");
const emailServes = require("../services/email.services.js");
const mongoose = require("mongoose");

async function createTransaction(req, res) {
  const session = await mongoose.startSession();

  try {
    /**
     * 1. Validate Request
     */
    const { fromAccount, toAccount, amount, idempotencyKey } = req.body;

    if (!fromAccount || !toAccount || !amount || !idempotencyKey) {
      return res.status(400).json({
        message: "fromAccount, toAccount, amount, idempotencyKey are required",
      });
    }

    /**
     * 2. Validate Accounts
     */
    const fromUserAccount = await accountModel.findById(fromAccount);
    const toUserAccount = await accountModel.findById(toAccount);

    if (!fromUserAccount || !toUserAccount) {
      return res.status(400).json({
        message: "Invalid from or to account",
      });
    }

    /**
     * 3. Check Idempotency
     */
    const isTransactionAlreadyExist = await transactionModel.findOne({
      idempotencyKey,
    });

    if (isTransactionAlreadyExist) {
      if (isTransactionAlreadyExist.status === "COMPLETED") {
        return res.status(200).json({
          message: "Transaction already processed",
        });
      }

      if (isTransactionAlreadyExist.status === "PENDING") {
        return res.status(200).json({
          message: "Transaction is still processing",
        });
      }

      if (isTransactionAlreadyExist.status === "FAILED") {
        return res.status(500).json({
          message: "Transaction processing failed",
        });
      }

      if (isTransactionAlreadyExist.status === "REVERSED") {
        return res.status(500).json({
          message: "Transaction was reversed. Please retry!",
        });
      }
    }

    /**
     * 4. Check account status
     */
    if (
      fromUserAccount.status !== "ACTIVE" ||
      toUserAccount.status !== "ACTIVE"
    ) {
      return res.status(400).json({
        message: "Both accounts must be ACTIVE to process transaction",
      });
    }

    /**
     * 5. Check balance
     */
    const balance = await fromUserAccount.getBalance();

    if (balance < amount) {
      return res.status(400).json({
        message: `Insufficient balance. Current balance is ${balance}. Requested amount is ${amount}.`,
      });
    }

    /**
     * 6. Start Transaction
     */
    session.startTransaction();

    const transaction = new transactionModel({
      fromAccount,
      toAccount,
      amount,
      idempotencyKey,
      status: "PENDING",
    });

    await transaction.save({ session });

    await ledgerModel.create(
      [
        {
          account: fromAccount,
          amount,
          transaction: transaction._id,
          type: "DEBIT",
        },
      ],
      { session },
    );

    await ledgerModel.create(
      [
        {
          account: toAccount,
          amount,
          transaction: transaction._id,
          type: "CREDIT",
        },
      ],
      { session },
    );

    transaction.status = "COMPLETED";
    await transaction.save({ session });

    await session.commitTransaction();

    /**
     * 7. Send Email
     */
    try {
      await emailServes.sendTransactionEmail(
        req.user.email,
        req.user.name,
        amount,
        toAccount,
      );
    } catch (err) {
      console.log("Email sending failed:", err.message);
    }

    return res.status(201).json({
      message: "Transaction completed successfully",
      transaction,
    });
  } catch (err) {
    await session.abortTransaction();

    return res.status(500).json({
      message: err.message,
    });
  } finally {
    await session.endSession();
  }
}
async function createInitialFundsTransaction(req, res) {
  const session = await mongoose.startSession();

  try {
    const { toAccount, amount, idempotencyKey } = req.body;

    // 1. Validate Request
    if (!toAccount || !amount || !idempotencyKey) {
      return res.status(400).json({
        message: "toAccount, amount and idempotencyKey are required",
      });
    }

    // 2. Validate Amount
    if (amount <= 0) {
      return res.status(400).json({
        message: "Amount must be greater than 0",
      });
    }

    // 3. Validate Receiver Account
    const toUserAccount = await accountModel.findById(toAccount);

    if (!toUserAccount) {
      return res.status(400).json({
        message: "Invalid toAccount",
      });
    }

    // 4. Find System Account
    const fromUserAccount = await accountModel.findOne({
      user: req.user._id,
    });

    if (!fromUserAccount) {
      return res.status(400).json({
        message: "System user account not found",
      });
    }

    // 5. Check Idempotency
    const existingTransaction = await transactionModel.findOne({
      idempotencyKey,
    });

    if (existingTransaction) {
      if (existingTransaction.status === "COMPLETE") {
        return res.status(200).json({
          message: "Transaction already processed",
          transaction: existingTransaction,
        });
      }

      if (existingTransaction.status === "PENDING") {
        return res.status(200).json({
          message: "Transaction is still processing",
        });
      }

      if (existingTransaction.status === "FAILED") {
        return res.status(500).json({
          message: "Previous transaction failed",
        });
      }

      if (existingTransaction.status === "REVERSED") {
        return res.status(500).json({
          message: "Transaction was reversed. Please retry.",
        });
      }
    }

    // 6. Check Account Status
    if (
      fromUserAccount.status !== "ACTIVE" ||
      toUserAccount.status !== "ACTIVE"
    ) {
      return res.status(400).json({
        message: "Both accounts must be ACTIVE",
      });
    }

    // 7. Start Transaction
    session.startTransaction();

    const transaction = new transactionModel({
      fromAccount: fromUserAccount._id,
      toAccount,
      amount,
      idempotencyKey,
      status: "PENDING",
    });

    await transaction.save({ session });

    await ledgerModel.create(
      [
        {
          account: fromUserAccount._id,
          amount,
          transaction: transaction._id,
          type: "DEBIT",
        },
      ],
      { session },
    );

    await ledgerModel.create(
      [
        {
          account: toAccount,
          amount,
          transaction: transaction._id,
          type: "CREDIT",
        },
      ],
      { session },
    );

    transaction.status = "COMPLETE";
    await transaction.save({ session });

    await session.commitTransaction();

    return res.status(201).json({
      message: "Initial funds transaction completed successfully",
      transaction,
    });
  } catch (err) {
    await session.abortTransaction();

    return res.status(500).json({
      message: err.message,
    });
  } finally {
    await session.endSession();
  }
}

module.exports = {
  createTransaction,
  createInitialFundsTransaction,
};
