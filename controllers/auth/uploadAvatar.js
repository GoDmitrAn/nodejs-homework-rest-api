const path = require("path");
const fs = require("fs/promises");
const { Users } = require("../../models/users");

async function uploadAvatar(req, res, next) {
  const { filename } = req.file;

  try {
    const tmpPath = path.resolve(__dirname, "../../tmp", filename);
    const publicPath = path.resolve(
      __dirname,
      "../../public/avatars",
      filename
    );
    await fs.rename(tmpPath, publicPath);

    const { user } = req;
    const { id } = user;
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
