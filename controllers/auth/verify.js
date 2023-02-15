const { Users } = require("../../models/users");
const { HttpError } = require("../../routes/helpers/index");

async function verifyUser(req, res, next) {
  const { verificationToken } = req.params;
  console.log("verytoken", verificationToken);
  try {
    const users = await Users.find();
    const user = users.find((u) => u.verificationToken === verificationToken);

    if (user === undefined) {
      return next(HttpError(404, "User not found"));
    }
    await Users.findByIdAndUpdate(user.id, {
      verificationToken: null,
      verify: true,
    });
    res.status(200).json({ message: "Verification successful" });
  } catch (error) {
    console.error("internal server", error);
  }
}
module.exports = { verifyUser };
