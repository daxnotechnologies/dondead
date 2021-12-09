import Ticket from "../models/ticket.js";

export const allTicket = async (req, res) => {
  try {
    const t = await Ticket.find();
    res.status(200).json(t);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

export const newTicket = async (req, res) => {
  try {
    const ticket = req.body;
    const n_ticket = await Ticket.create(ticket);

    res.status(200).json(n_ticket);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};
