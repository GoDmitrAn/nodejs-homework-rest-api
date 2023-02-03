const { HttpError } = require("../../routes/helpers/index");
const { Users } = require("../../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// const { JWT_SECRET } = process.env;

async function loginUser(req, res, next) {
  const { email, password } = req.body;
  const storedUser = await Users.findOne({ email });
  if (!storedUser) {
    throw HttpError(401, "email is not valid");
  }
  const isPassword = await bcrypt.compare(password, storedUser.password);
  if (!isPassword) {
    throw HttpError(401, "password is not valid");
  }
  const token = jwt.sign({ id: storedUser._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  await Users.findByIdAndUpdate(storedUser._id, { token: token });
  res.json({ token });
}

module.exports = { loginUser };
