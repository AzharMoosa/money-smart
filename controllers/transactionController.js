import asyncHandler from "express-async-handler";

// @desc        Get Users Transactions
// @route       GET /api/transactions
// @access      Private
const getUsersTransactions = asyncHandler(async (req, res) => {
  const transaction = await Transaction.find({ user: req.user._id });

  if (transaction) {
    res.json(transaction);
  } else {
    res.status(401);
    throw new Error("Unable To Get Savings");
  }
});

// @desc        Create Transaction
// @route       POST /api/savings
// @access      Private
const createTransaction = asyncHandler(async (req, res) => {
  const {} = req.body;

  const transaction = await Transaction.create({
    user: req.user._id,
  });

  if (transaction) {
    res.json(transaction);
  } else {
    res.status(401);
    throw new Error("Cannot Create Transaction");
  }
});

export { getUsersTransactions, createTransaction };
