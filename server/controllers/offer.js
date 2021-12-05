import Offer from "../models/offer.js";
import User from "../models/user.js";
import { createTransport } from "nodemailer";

var transporter = createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  // port: 465,
  // secure: true,
  auth: {
    // type: "OAuth2",
    user: "testfirebaseorfik@gmail.com",
    pass: "Orfik123@",
  },
});

export const newOffer = async (req, res) => {
  // if (!req.userId) return res.status(401).json({ message: "Unauthenticated" });

  const offer = req.body;

  try {
    const offers = await Offer.create({
      ...offer,
      timestamp: Date.now(),
      cancel: false,
    });

    const user = await User.find({ email: offers.offererID });

    await User.findByIdAndUpdate(offers.offererID, {
      ...user,
      balance: user.balance + offers.amount,
      coins: user.coins + offer.amount * 10,
    });

    var mailOptions = {
      from: "testfirebaseorfik@gmail.com",
      to: user.email,
      subject: "Offer created",
      text: "The offer you sent has been created",
    };

    res.status(200).json(offers);

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong." });
  }
};

export const getProfileOffers = async (req, res) => {
  const { offererID } = req.query;
  try {
    let offers = await Offer.find({ offererID });

    res.status(200).json(offers);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

export const getOffers = async (req, res) => {
  try {
    let offers = await Offer.find();
    offers = offers.map(async (offer) => {
      const offerer = await User.findById(offer.offererID);
      const g = {
        _id: offer._id,
        status: offer.status,
        offererID: offer.offererID,
        amount: offer.amount,
        offerer: offerer.firstName,
      };

      return g;
    });

    offers = await Promise.all(offers);

    res.status(200).json(offers);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

export const cancelOffer = async (req, res) => {
  try {
    const { _id, balance } = req.body;
    const off = await Offer.findByIdAndUpdate(
      _id,
      { cancel: true },
      { new: true }
    );
    console.log(off);

    const u = await User.findByIdAndUpdate(
      off.offererID,
      {
        balance: balance - off.amount,
      },
      { new: true }
    );

    res.status(200);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};
