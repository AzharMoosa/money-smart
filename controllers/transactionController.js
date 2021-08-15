import asyncHandler from "express-async-handler";
import Transaction from "../models/Transaction.js";

// @desc        Get Users Transactions
// @route       GET /api/transactions
// @access      Private
const getUsersTransactions = asyncHandler(async (req, res) => {
  const transactions = await Transaction.find({ user: req.user._id });

  if (transactions) {
    res.json(transactions);
  } else {
    res.status(401);
    throw new Error("Unable To Get Transactions");
  }
});

// @desc        Create Transaction
// @route       POST /api/transactions
// @access      Private
const createTransaction = asyncHandler(async (req, res) => {
  const { name, type, information, date, amount } = req.body;

  const transaction = await Transaction.create({
    name,
    type,
    information,
    date,
    amount,
    user: req.user._id,
  });

  if (transaction) {
    res.json(transaction);
  } else {
    res.status(401);
    throw new Error("Cannot Create Transaction");
  }
});

// @desc        Get Transactions By ID
// @route       GET /api/transactions/:id
// @access      Private
const getTransaction = asyncHandler(async (req, res) => {
  const transaction = await Transaction.findById(req.params.id);

  if (transaction) {
    res.json(transaction);
  } else {
    res.status(401);
    throw new Error("Cannot Create Transaction");
  }
});

// @desc        Update Savings
// @route       PUT /api/transactions/:id
// @access      Private
const updateTransaction = asyncHandler(async (req, res) => {
  const transaction = await Transaction.findById(req.params.id);

  if (transaction) {
    transaction.name = req.body.name || transaction.name;
    transaction.type = req.body.type || transaction.type;
    transaction.information = req.body.information || transaction.information;
    transaction.date = req.body.date || transaction.date;
    transaction.amount = req.body.amount || transaction.amount;

    const updatedTransactions = await transaction.save();

    res.json(updatedTransactions);
  } else {
    res.status(404);
    throw new Error("Transactions Not Found");
  }
});

// @desc    Delete Saving
// @route   DELETE /api/transactions/:id
// @access  Private
const deleteTransaction = asyncHandler(async (req, res) => {
  const transaction = await Transaction.findById(req.params.id);

  if (transaction) {
    await transaction.remove();
    res.json({ message: "Transaction Removed" });
  } else {
    res.status(404);
    throw new Error("Transaction Not Found");
  }
});

export {
  getUsersTransactions,
  getTransaction,
  createTransaction,
  updateTransaction,
  deleteTransaction,
};
