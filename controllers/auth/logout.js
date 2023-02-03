const { Users } = require("../../models/users");

async function logoutUser(req, res, next) {
  const { user } = req;
  const { id } = user;
  const storedUser = await Users.findById(id);
  if (!storedUser) {
    next(HttpError(401, "Not authorized"));
  }
  await Users.findByIdAndUpdate(storedUser._id, { token: null });
  res.status(204).json();
}
module.exports = { logoutUser };
