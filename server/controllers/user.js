import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/user.js";

export const getAll = async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser)
      return res.status(404).json({ message: "User doesn't exist." });

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid Password" });

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      process.env.SECRET
    );
    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong." });
  }
};

export const signup = async (req, res) => {
  const { firstName, lastName, email, password, vatID } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser)
      return res.status(400).json({ message: "User already exists." });

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    const result = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      vatID,
      balance: 0,
      coins: 0,
      verified: false,
      timestamp: Date.now(),
    });

    const token = jwt.sign(
      { email: result.email, id: result._id },
      process.env.SECRET
    );
    res.status(200).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

export const getProfile = async (req, res) => {
  if (!req.userId) return res.status(401).json({ message: "Unauthenticated" });

  try {
    const {
      _id,
      firstName,
      lastName,
      email,
      balance,
      coins,
      paypal,
      bankDetails,
      verified,
      vatID,
      billing,
      timestamp,
    } = await User.findById(req.userId);

    res.status(200).json({
      _id,
      firstName,
      lastName,
      email,
      balance,
      coins,
      paypal,
      bankDetails,
      verified,
      vatID,
      billing,
      timestamp,
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

export const getProfilebyAdmin = async (req, res) => {
  const { id } = req.query;

  try {
    const {
      _id,
      firstName,
      lastName,
      email,
      balance,
      coins,
      paypal,
      bankDetails,
      verified,
      vatID,
      billing,
      timestamp,
    } = await User.findById(id);

    res.status(200).json({
      _id,
      firstName,
      lastName,
      email,
      balance,
      coins,
      paypal,
      bankDetails,
      verified,
      vatID,
      billing,
      timestamp,
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

export const updateBilling = async (req, res) => {
  if (!req.userId) return res.status(401).json({ message: "Unauthenticated" });

  try {
    const billing = req.body;

    const user = await User.findByIdAndUpdate(
      req.userId,
      { billing },
      { new: true }
    );
    res.status(200);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const user = req.body;
    const h = await User.findByIdAndUpdate(user._id, user, { new: true });
    res.status(200);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong." });
  }
};
