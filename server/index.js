const express = require("express");
const cors = require("cors");

const app = express();
const bodyParser = require('body-parser');
const userRouter = require("./routes/userRoutes");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '10mb' }));
app.use(cors({ origin: '*', credentials: true }));
app.get("/", (req, res) =>
  res.json({ success: true, message: "server is running!" })
);

app.use("/api", userRouter);
module.exports = app;
