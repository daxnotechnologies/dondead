import Offer from "../models/offer.js";
import User from "../models/user.js";
import { createTransport } from "nodemailer";
import hbs from "nodemailer-express-handlebars";
import path from "path";

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

export const newOffer = async (req, res) => {
  // if (!req.userId) return res.status(401).json({ message: "Unauthenticated" });

  const offer = req.body;

  try {
    let user = await User.findById(offer.offererID);

    const offers = await Offer.create({
      ...offer,
      timestamp: Date.now(),
      cancel: false,
      status: "NOT SHIPPED",
      offerer: `${user.firstName} ${user.lastName}`,
      timeline: [],
      paymentStatus: "NOT CLEARED",
    });

    // console.log(user);

    user = await User.findByIdAndUpdate(
      offers.offererID,
      {
        balance: user.balance + offers.amount,
        coins: (user.coins ? user.coins : 0) + offer.amount * 10,
      },
      { new: true }
    );

    const handlebarOptions = {
      viewEngine: {
        partialsDir: path.resolve("./controllers/views/"),
        defaultLayout: false,
      },
      viewPath: path.resolve("./controllers/views/"),
    };

    transporter.use("compile", hbs(handlebarOptions));

    var mailOptions = {
      from: "testfirebaseorfik@gmail.com",
      to: user.email,
      subject: "Offer created",
      template: "invoice",
      context: {
        date: new Date(offers.timestamp).getDate(),
        total: offers.amount,
        email: user.email,
        name: `${user.firstName} ${user.lastName}`,
        street: user.billing.street,
        zip: user.billing.zip,
        city: user.billing.city,
        items: offers.products,
        fee: offers.shippingFee,
        subTotal: offers.amount - offers.shippingFee,
      },
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
    res.status(500).json({ message: "Something went wrong.", error });
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
    // offers = offers.map(async (offer) => {
    //   const offerer = await User.findById(offer.offererID);
    //   const g = {
    //     _id: offer._id,
    //     status: offer.status,
    //     offererID: offer.offererID,
    //     amount: offer.amount,
    //     timestamp: offer.timestamp,
    //     offerer: `${offerer.firstName} ${offerer.lastName}`,
    //   };

    //   return g;
    // });

    // offers = await Promise.all(offers);

    offers.reverse();

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

export const updateArrive = async (req, res) => {
  try {
    const { _id, offer } = req.body;

    let timeline = [];

    if (offer.timeline) {
      timeline = offer.timeline;
    }
    timeline.push({
      message: "The offer was marked as completed.",
      date: Date.now(),
    });

    console.log(timeline);

    const u = await Offer.findByIdAndUpdate(_id, { ...offer, timeline });

    const { email } = await User.findById(u.offererID);

    var mailOptions = {
      from: "testfirebaseorfik@gmail.com",
      to: email,
      subject: "Offer Received",
      text: "The offer you sent has been received",
    };

    res.status(200);

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

export const updateVerified = async (req, res) => {
  try {
    const { _id, offer } = req.body;

    let timeline = [];

    if (offer.timeline) {
      timeline = offer.timeline;
    }
    timeline.push({
      message: "The offer was marked as verified.",
      date: Date.now(),
    });

    console.log(timeline);

    const u = await Offer.findByIdAndUpdate(_id, { ...offer, timeline });

    const { email } = await User.findById(u.offererID);

    var mailOptions = {
      from: "testfirebaseorfik@gmail.com",
      to: email,
      subject: "Offer Verified",
      text: "The offer you sent has been verified",
    };

    res.status(200);

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

export const updateOffer = async (req, res) => {
  try {
    const { _id, offer } = req.body;

    let timeline = [];

    if (offer.timeline) {
      timeline = offer.timeline;
    }
    timeline.push({
      message: "The offer was updated.",
      date: Date.now(),
    });

    const u = await Offer.findByIdAndUpdate(_id, { ...offer, timeline });

    const { email } = await User.findById(u.offererID);

    var mailOptions = {
      from: "testfirebaseorfik@gmail.com",
      to: email,
      subject: "Offer Verified",
      text: "The offer you sent has been updated",
    };

    res.status(200);

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

export const updatePayment = async (req, res) => {
  try {
    const { _id, offer } = req.body;

    let timeline = [];

    if (offer.timeline) {
      timeline = offer.timeline;
    }
    timeline.push({
      message: "The payment was cleared for this offer.",
      date: Date.now(),
    });

    console.log(timeline);

    const u = await Offer.findByIdAndUpdate(_id, { ...offer, timeline });

    const { email } = await User.findById(u.offererID);

    var mailOptions = {
      from: "testfirebaseorfik@gmail.com",
      to: email,
      subject: "Offer Verified",
      text: "The offer you sent has been verified",
    };

    res.status(200);

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

export const getOneOffer = async (req, res) => {
  try {
    const { id } = req.query;

    const offer = await Offer.findById(id);

    res.status(200).json(offer);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};
