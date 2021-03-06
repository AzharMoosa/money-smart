import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import User from "../models/User.js";
import Receipt from "../models/Receipt.js";
import Saving from "../models/Saving.js";
import Transaction from "../models/Transaction.js";

// @desc        Login User
// @route       POST /api/users/login
// @access      Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});

// @desc        Register User
// @route       POST /api/users
// @access      Public
const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User Already Exists");
  }

  const user = await User.create({
    firstName,
    lastName,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Cannot Register User");
  }
});

// @desc        Get User Profile
// @route       GET /api/users/profile
// @access      Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});

// @desc    Get User By ID
// @route   GET /api/users/:id
// @access  Private
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});

// @desc        Update User Details
// @route       PUT /api/users
// @access      Private
const updateUserDetails = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.age = req.body.age || user.age;
    user.retirementAge = req.body.retirementAge || user.retirementAge;
    user.salary = req.body.salary || user.salary;

    const updatedUser = await user.save();

    res.json(updatedUser);
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});

// @desc        Update User Profile
// @route       PUT /api/users/profile
// @access      Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.firstName = req.body.firstName || user.firstName;
    user.lastName = req.body.lastName || user.lastName;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      email: updatedUser.email,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});

// @desc    Delete User
// @route   DELETE /api/users/:id
// @access  Private
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    const savings = await Saving.find({ user: req.user._id });
    if (savings) {
      for (let i = 0; i < savings.length; i++) {
        const saving = await Saving.findById(savings[i]._id);
        await saving.remove();
      }
    }
    const transactions = await Transaction.find({ user: req.user._id });
    if (transactions) {
      for (let i = 0; i < transactions.length; i++) {
        const transaction = await Transaction.findById(transactions[i]._id);
        await transaction.remove();
      }
    }
    const receipts = await Receipt.find({ user: req.user._id });
    if (receipts) {
      for (let i = 0; i < receipts.length; i++) {
        const receipt = await Receipt.findById(receipts[i]._id);
        await receipt.remove();
      }
    }
    await user.remove();
    res.json({ message: "User Removed" });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});

const loginGoogle = asyncHandler(async (req, res) => {
  const { firstName, lastName, email } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(201).json({
      _id: userExists._id,
      firstName: userExists.firstName,
      lastName: userExists.lastName,
      email: userExists.email,
      token: generateToken(userExists._id),
    });
    return;
  }

  const user = await User.create({
    firstName,
    lastName,
    email,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Cannot Register User");
  }
});

export {
  loginUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  updateUserDetails,
  getUserById,
  deleteUser,
  loginGoogle,
};
