const express = require("express");

const { register } = require("../../controllers/auth/signup");
const { loginUser } = require("../../controllers/auth/login");
const { currentUser } = require("../../controllers/auth/current");

const { tryCatchWrapper } = require("../helpers");
const { auth } = require("../../middlewares/index");

const authRouter = express.Router();

authRouter.post("/signup", tryCatchWrapper(register));
authRouter.post("/login", tryCatchWrapper(loginUser));
authRouter.get("/current", tryCatchWrapper(auth), tryCatchWrapper(currentUser));

module.exports = {
  authRouter,
};
