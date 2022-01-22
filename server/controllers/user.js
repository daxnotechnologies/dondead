import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createTransport } from "nodemailer";
import { randomBytes } from "crypto";

import User from "../models/user.js";
import Token from "../models/token.js";

var transporter = createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  // port: 465,
  // secure: true,
  auth: {
    // type: "OAuth2",
    user: "testfirebaseorfik@gmail.com",
    pass: "orfik123@",
  },
});

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
    res.status(500).json({ message: "Something went wrong." });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ message: "User doesn't exist." });

    let token = await Token.findOne({ userEmail: user.email });

    if (!token) {
      token = await Token.create({
        userEmail: user.email,
        token: randomBytes(32).toString("hex"),
      });
    }

    const link = `https://dondead-frontend.uc.r.appspot.com/password-reset/${user.email}/${token.token}`;

    var mailOptions = {
      from: "testfirebaseorfik@gmail.com",
      to: user.email,
      subject: "Password Reset",
      html: `<h1>Password Rest Link</h1><p>The link for reseting the password is as follows: <a href=${link}>${link}</a></p>`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    res.status(200).json({ message: "Email for password reset sent." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong." });
  }
};

export const checkToken = async (req, res) => {
  try {
    const { token } = req.body;

    const tokenn = await Token.findOne({ token });

    if (!tokenn) res.status(404).json({ message: "Token Invalid" });

    res.status(200).json({ message: "Token Valid" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { email, password, token } = req.body;

    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ message: "User doesn't exist." });

    let tokenn = await Token.findOne({ token });

    if (!tokenn) res.status(404).json({ message: "Token Invalid" });

    const user = await User.findByIdAndUpdate(
      user._id,
      { password },
      { new: true }
    );

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};
