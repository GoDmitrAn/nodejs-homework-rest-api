const express = require("express");

const { register } = require("../../controllers/auth/signup");
const { loginUser } = require("../../controllers/auth/login");
const { currentUser } = require("../../controllers/auth/current");
const { logoutUser } = require("../../controllers/auth/logout");
const { uploadAvatar } = require("../../controllers/auth/uploadAvatar");

const { tryCatchWrapper } = require("../helpers");
const { auth, validateBody, upload } = require("../../middlewares/index");
const { usersSchema } = require("../../schemas/users");

const authRouter = express.Router();

authRouter.post(
  "/signup",
  validateBody(usersSchema),
  tryCatchWrapper(register)
);
authRouter.post(
  "/login",
  validateBody(usersSchema),
  tryCatchWrapper(loginUser)
);
authRouter.get("/current", tryCatchWrapper(auth), tryCatchWrapper(currentUser));
authRouter.get("/logout", tryCatchWrapper(auth), tryCatchWrapper(logoutUser));
authRouter.patch(
  "/avatars",
  tryCatchWrapper(auth),
  tryCatchWrapper(upload.single("avatar")),
  tryCatchWrapper(uploadAvatar)
);

module.exports = {
  authRouter,
};
