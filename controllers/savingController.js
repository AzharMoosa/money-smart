import asyncHandler from "express-async-handler";
import Saving from "../models/Saving.js";

// @desc        Get Users Savings
// @route       GET /api/savings
// @access      Private
const getUsersSavings = asyncHandler(async (req, res) => {
  const savings = await Saving.find({ user: req.user._id });

  if (savings) {
    res.json(savings);
  } else {
    res.status(401);
    throw new Error("Unable To Get Savings");
  }
});

// @desc        Create Savings
// @route       POST /api/savings
// @access      Private
const createSavings = asyncHandler(async (req, res) => {
  const { name, amountRequired, description, deadline } = req.body;

  const saving = await Saving.create({
    name,
    amountRequired,
    description,
    deadline,
    user: req.user._id,
  });

  if (saving) {
    res.json(saving);
  } else {
    res.status(401);
    throw new Error("Cannot Create Savings");
  }
});

// @desc        Get Saving
// @route       GET /api/savings/:id
// @access      Private
const getSaving = asyncHandler(async (req, res) => {
  const saving = await Saving.findById(req.params.id);

  if (saving) {
    res.json(saving);
  } else {
    res.status(401);
    throw new Error("Cannot Get Saving");
  }
});

// @desc        Update Savings
// @route       PUT /api/savings/:id
// @access      Private
const updateSavings = asyncHandler(async (req, res) => {
  const saving = await Saving.findById(req.params.id);

  if (saving) {
    saving.name = req.body.name || saving.name;
    saving.amountRequired = req.body.amountRequired || saving.amountRequired;
    saving.description = req.body.description || saving.description;
    saving.deadline = req.body.deadline || saving.deadline;

    const updatedSavings = await saving.save();

    res.json(updatedSavings);
  } else {
    res.status(404);
    throw new Error("Savings Not Found");
  }
});

// @desc        Add Amount To Savings
// @route       PUT /api/savings/add/:id
// @access      Private
const addAmount = asyncHandler(async (req, res) => {
  const saving = await Saving.findById(req.params.id);
  const { amount, date } = req.body;

  if (saving) {
    const data = {
      date,
      amount,
    };
    saving.amountSaved = saving.amountSaved + amount;
    saving.history = [...saving.history, data];

    const updatedSavings = await saving.save();

    res.json(updatedSavings);
  } else {
    res.status(404);
    throw new Error("Savings Not Found");
  }
});

// @desc    Delete Saving
// @route   DELETE /api/users/:id
// @access  Private
const deleteSaving = asyncHandler(async (req, res) => {
  const saving = await Saving.findById(req.params.id);

  if (saving) {
    await saving.remove();
    res.json({ message: "Saving Removed" });
  } else {
    res.status(404);
    throw new Error("Saving Not Found");
  }
});

export {
  getUsersSavings,
  getSaving,
  createSavings,
  updateSavings,
  addAmount,
  deleteSaving,
};
