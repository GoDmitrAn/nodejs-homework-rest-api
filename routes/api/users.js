const express = require("express");

const { register } = require("../../controllers/auth/signup");
const { loginUser } = require("../../controllers/auth/login");
const { currentUser } = require("../../controllers/auth/current");
const { logoutUser } = require("../../controllers/auth/logout");
const { uploadAvatar } = require("../../controllers/auth/uploadAvatar");

const { tryCatchWrapper } = require("../helpers");
const { auth, validateBody, upload } = require("../../middlewares/index");
const {
  usersSchema,
  usersLoginSchema,
  resendVerify,
} = require("../../schemas/users");
const {
  verifyUser,
  resendUserVerify,
} = require("../../controllers/auth/verify");

const authRouter = express.Router();

authRouter.post(
  "/signup",
  validateBody(usersSchema),
  tryCatchWrapper(register)
);
authRouter.post(
  "/login",
  validateBody(usersLoginSchema),
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
authRouter.get("/verify/:verificationToken", tryCatchWrapper(verifyUser));
authRouter.post(
  "/verify",
  validateBody(resendVerify),
  tryCatchWrapper(resendUserVerify)
);

module.exports = {
  authRouter,
};
