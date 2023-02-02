const { HttpError } = require("../../routes/helpers/index");
const { Users } = require("../../models/users");
const bcrypt = require("bcrypt");

async function loginUser(req, res, next) {
  const { email, password } = req.body;
  const storedUser = await Users.findOne({ email });
  if (!storedUser) {
    throw new HttpError(401, "email is not valid");
  }
  const isPassword = await bcrypt.compare(password, storedUser.password);
  if (!isPassword) {
    throw new HttpError(401, "password is not valid");
  }

  res.json({ token: "Token" });
}

module.exports = { loginUser };
