const express = require("express");

const { register } = require("../../controllers/auth/signup");
const { tryCatchWrapper } = require("../helpers");

const authRouter = express.Router();

authRouter.post("/signup", tryCatchWrapper(register));

module.exports = {
  authRouter,
};
