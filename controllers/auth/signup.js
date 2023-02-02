const { Users } = require("../../models/users");
const { HttpError } = require("../../routes/helpers/index");

async function register(req, res, next) {
  const { email, password, subscription } = req.body;
  try {
    const savedUser = await Users.create({
      email,
      password,
      subscription,
    });
    res.status(201).json({
      data: {
        user: savedUser,
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
