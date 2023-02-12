const path = require("path");
const fs = require("fs/promises");
const { Users } = require("../../models/users");
var Jimp = require("jimp");
const { nanoid } = require("nanoid");

async function uploadAvatar(req, res, next) {
  const { filename } = req.file;

  try {
    const tmpPath = path.resolve(__dirname, "../../tmp", filename);
    const publicPath = path.resolve(
      __dirname,
      "../../public/avatars",
      filename
    );

    const { user } = req;
    const { id } = user;

    //   resize image
    let image = await Jimp.read(tmpPath);
    image.resize(250, 250);
    const randomNumber = nanoid(5);
    const newFileName = randomNumber + filename;
    console.log(newFileName);
    image.write("./tmp/" + filename);

    await fs.rename(tmpPath, publicPath);

    const avatarPath = `/public/avatars/${filename}`;
    const storedUser = await Users.findByIdAndUpdate(
      id,
      {
        avatarURL: avatarPath,
      },
      { new: true }
    );

    return res.json({ avatarURL: storedUser.avatarURL });
  } catch (error) {
    console.error("error while moving file to avatars ", error);
    await fs.unlink(tmpPath);
    return res.status(500).json({ message: "internal server error" });
  }
}
module.exports = { uploadAvatar };
