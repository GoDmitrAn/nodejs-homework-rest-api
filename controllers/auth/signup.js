const { Users } = require("../../models/users");
const { HttpError } = require("../../routes/helpers/index");
const bcrypt = require("bcrypt");
var gravatar = require("gravatar");

async function register(req, res, next) {
  const { email, password } = req.body;

  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);
  try {
    const generatedAvatar = gravatar.url(email, { size: "250" });
    const savedUser = await Users.create({
      email,
      password: hashedPassword,
      avatarURL: generatedAvatar,
    });
    res.status(201).json({
      data: {
        user: {
          email,
          subscription: savedUser.subscription,
          avatarURL: generatedAvatar,
        },
      },
    });
  } catch (error) {
    if (error.message.includes("E11000 duplicate key error")) {
      console.log("error while saving user");
      return next(HttpError(409, "Email in use"));
    }
    throw error;
  }
}
module.exports = { register };
