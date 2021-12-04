import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import userRoute from "./routes/user.js";
import adminRoute from "./routes/admin.js";
import productRoute from "./routes/product.js";
import offerRoute from "./routes/offer.js";

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello world");
});

// Setting up Routes
app.use("/user", userRoute);
app.use("/admin", adminRoute);
app.use("/product", productRoute);
app.use("/offer", offerRoute);

const PORT = process.env.PORT || 8080;

mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => app.listen(PORT, () => console.log(`Server running on ${PORT}`)))
  .catch((error) => console.log(error.message));
