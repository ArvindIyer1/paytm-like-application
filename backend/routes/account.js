import express from 'express';
import { authMiddleware } from '../middleware';
import mongoose from 'mongoose';
import { Account } from '../db';

const router = express.Router();

router.get("/balance", authMiddleware, async (req, res) => {
  const account = await Account.findOne({
    userId: req.userId
  })

  if(!account){
    return res.status(400).json({
      msg : "account not found"
    })
  }

  res.json({
    balance: account.balance
  })
})

router.post("/transfer", authMiddleware, async (req, res) => {
  const session = await mongoose.startSession();

  session.startTransaction();

  try{
    const { amount, to } = req.body;

    const account = await Account.findOne({
      userId: req.userId
    }).session(session);

    if (!account || account.balance < amount) {
      await session.abortTransaction();
      return res.status(400).json({
        msg: "Insufficient balance/account doesnt exist"
      });
    }

    const toAccount = await Account.findOne({
      userId: to
    }).session(session);

    if (!toAccount) {
      await session.abortTransaction();
      return res.status(400).json({
        msg: "Invalid account"
      })
    }

    await Account.updateOne({
      userId: req.userId,

    }, {
      $inc: { balance: -amount }
    }).session(session);


    await Account.updateOne({
      userId: to
    }, {
      $inc: { balance: amount }
    }).session(session);

    await session.commitTransaction();

    res.json({
      msg: "Transaction Successful"
    });
  }catch(error) {
    await session.abortTransaction();
    res.status(400).json({
      msg : "Transaction failed"
    });
  }finally {
    session.endSession();
  }  
})

module.exports = {
  router
}

