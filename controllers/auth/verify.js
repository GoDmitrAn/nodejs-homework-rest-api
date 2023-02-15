const { Users } = require("../../models/users");
const { HttpError } = require("../../routes/helpers/index");
const sendGrid = require("@sendgrid/mail");

async function verifyUser(req, res, next) {
  const { verificationToken } = req.params;

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
async function resendUserVerify(req, res, next) {
  try {
    const { email } = req.body;
    const storedUser = await Users.findOne({ email });
    if (!storedUser) {
      return next(HttpError(404, "User not found"));
    }
    if (storedUser.verify) {
      return next(HttpError(400, "Verification has already been passed"));
    }

    //send verification mail
    sendGrid.setApiKey(process.env.SEND_GRID_KEY);
    const emailMsg = {
      to: "dismus1982@yahoo.com",
      from: "iqbitsak@gmail.com",
      subject: "Sending with SendGrid is Fun",
      text: `and easy to do anywhere, even with Node.js. <a href="/users/verify/${storedUser.verificationToken}"> verify</a>  `,
      html: `<h1> Hello there! <a href="/users/verify/${storedUser.verificationToken}"> verify</a> </h1>`,
    };
    const response = await sendGrid.send(emailMsg);
    console.log(response);

    res.status(200).json({ message: "Verification email sent" });
  } catch (error) {
    console.error("internal server", error);
  }
}
module.exports = { verifyUser, resendUserVerify };
