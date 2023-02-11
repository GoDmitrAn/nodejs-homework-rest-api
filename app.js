const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const contactsRouter = require("./routes/api/contacts");
const { authRouter } = require("./routes/api/users");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

//middlewares
app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json()); //tell express to work with JSON in body
app.use("/public/avatars", express.static("public/avatars"));

//routes
app.use("/api/contacts", contactsRouter);
app.use("/api/users", authRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  //handle mongoose validation error
  if (err.name === "ValidationError") {
    return res.status(400).json({ message: err.message });
  }

  if (err.status) {
    return res.status(err.status).json({ message: err.message });
  }
  console.error("API Error: ", err.message);
  res.status(500).json({ message: err.message });
});

module.exports = app;
