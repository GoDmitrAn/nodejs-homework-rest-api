const path = require("path");
const fs = require("fs/promises");
const { Users } = require("../../models/users");
var Jimp = require("jimp");
const { nanoid } = require("nanoid");

async function uploadAvatar(req, res, next) {
  const { filename, path: temporaryName } = req.file;

  try {
    const tmpPath = path.resolve(__dirname, "../../tmp", filename);
    const publicPath = path.resolve(
      __dirname,
      "../../public/avatars",
      filename
    );

    const { user } = req;
    const { id, email } = user;
    const [emailName, serverName] = email.split("@");
    const [namePart, extensionPart] = filename.split(".");

    //   resize image
    let image = await Jimp.read(tmpPath);
    image.resize(250, 250);
    // const randomNumber = nanoid(3);
    const newFileName =
      emailName + "-" + nanoid(3) + "-avatar" + "." + extensionPart;
    console.log("newFileName", newFileName);
    image.write("./tmp/" + filename);

    //rename and move file to public directory
    await fs.rename(
      path.resolve(__dirname, "../../tmp", filename),
      path.resolve(__dirname, "../../tmp", newFileName)
    );
    await fs.rename(
      path.resolve(__dirname, "../../tmp", newFileName),
      path.resolve(__dirname, "../../public/avatars", newFileName)
    );

    const avatarPath = `/public/avatars/${newFileName}`;
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
    await fs.unlink(path.resolve(__dirname, "../../tmp", newFileName));
    return res.status(500).json({ message: "internal server error" });
  }
}
module.exports = { uploadAvatar };
