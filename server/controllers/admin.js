import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import Admin from "../models/admin.js";

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await Admin.findOne({ email });

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
      process.env.SECRET,
      { expiresIn: "12h" }
    );
    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong." });
  }
};

export const signup = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    const existingUser = await Admin.findOne({ email });

    if (existingUser)
      return res.status(400).json({ message: "User already exists." });

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    const result = await Admin.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign(
      { email: result.email, id: result._id },
      process.env.SECRET,
      { expiresIn: "6h" }
    );
    res.status(200).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

export const getProfile = async (req, res) => {
  // if (!req.userId) return res.status(401).json({ message: "Unauthenticated" });

  try {
    const { firstName, lastName, email, _id } = await Admin.findById(
      req.userId
    );

    res.status(200).json({ firstName, lastName, email, _id });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};
