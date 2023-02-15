const { Users } = require("../../models/users");
const { HttpError } = require("../../routes/helpers/index");
const { nanoid } = require("nanoid");
const bcrypt = require("bcrypt");
var gravatar = require("gravatar");
// const { SEND_GRID_KEY } = process.env;
const sendGrid = require("@sendgrid/mail");

async function register(req, res, next) {
  const { email, password } = req.body;
  const verificationToken = nanoid(10);
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);
  try {
    const generatedAvatar = gravatar.url(email, { size: "250" });
    const savedUser = await Users.create({
      email,
      password: hashedPassword,
      avatarURL: generatedAvatar,
      verificationToken: verificationToken,
    });

    //send verification mail
    sendGrid.setApiKey(process.env.SEND_GRID_KEY);
    const emailMsg = {
      to: "iqbitsak@gmail.com",
      from: "iqbitsak@gmail.com",
      subject: "Sending with SendGrid is Fun",
      text: "and easy to do anywhere, even with Node.js",
      html: "<h1> Hello there!</h1>",
    };
    const response = await sendGrid.send(emailMsg);
    console.log(response);

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
