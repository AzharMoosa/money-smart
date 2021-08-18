import asyncHandler from "express-async-handler";
import Receipt from "../models/Receipt.js";

// @desc        Get Users Receipts
// @route       GET /api/receipts
// @access      Private
const getUsersReceipts = asyncHandler(async (req, res) => {
  const pageSize = 12;
  const page = Number(req.query.pageNumber) || 1;
  const receipts = await Receipt.find({ user: req.user._id })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  const count = await Receipt.countDocuments({});

  if (receipts) {
    res.json({ receipts, page, pages: Math.ceil(count / pageSize) });
  } else {
    res.status(401);
    throw new Error("Unable To Get Receipts");
  }
});

// @desc        Create Receipts
// @route       POST /api/receipts
// @access      Private
const createReceipt = asyncHandler(async (req, res) => {
  const { name, type, amount, date, image } = req.body;

  const receipt = await Receipt.create({
    name,
    type,
    amount,
    date,
    image,
    user: req.user._id,
  });

  if (receipt) {
    res.json(receipt);
  } else {
    res.status(401);
    throw new Error("Cannot Create Receipts");
  }
});

// @desc        Get Receipt
// @route       GET /api/receipts/:id
// @access      Private
const getReceipt = asyncHandler(async (req, res) => {
  const receipt = await Receipt.findById(req.params.id);

  if (receipt) {
    res.json(receipt);
  } else {
    res.status(401);
    throw new Error("Cannot Get Receipt");
  }
});

// @desc        Update Receipt
// @route       PUT /api/receipts/:id
// @access      Private
const updateReceipt = asyncHandler(async (req, res) => {
  const receipt = await Receipt.findById(req.params.id);

  if (receipt) {
    receipt.name = req.body.name || receipt.name;
    receipt.type = req.body.type || receipt.type;
    receipt.amount = req.body.amount || receipt.amount;
    receipt.date = req.body.date || receipt.date;
    receipt.image = req.body.image || receipt.image;

    const updatedReceipt = await receipt.save();

    res.json(updatedReceipt);
  } else {
    res.status(404);
    throw new Error("Receipt Not Found");
  }
});

// @desc    Delete TransactionS
// @route   DELETE /api/transactions
// @access  Private
const deleteReceipts = asyncHandler(async (req, res) => {
  const receipts = await Receipt.find({ user: req.user._id });

  if (receipts) {
    for (let i = 0; i < receipts.length; i++) {
      const receipt = await Receipt.findById(receipts[i]._id);
      await receipt.remove();
    }
    res.json({ message: "Receipts Removed" });
  } else {
    res.status(404);
    throw new Error("Receipts Not Found");
  }
});

export {
  getUsersReceipts,
  createReceipt,
  getReceipt,
  updateReceipt,
  deleteReceipts,
};
