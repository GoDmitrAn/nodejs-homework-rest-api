const express = require("express");

const { register } = require("../../controllers/auth/signup");
const { loginUser } = require("../../controllers/auth/login");
const { tryCatchWrapper } = require("../helpers");

const authRouter = express.Router();

authRouter.post("/signup", tryCatchWrapper(register));
authRouter.post("/login", tryCatchWrapper(loginUser));

module.exports = {
  authRouter,
};
