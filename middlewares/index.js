const { HttpError } = require("../routes/helpers");
const jwt = require("jsonwebtoken");
const { Users } = require("../models/users");
const multer = require("multer");

function validateBody(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return next(HttpError(400, "missing required name field"));
    }
    return next();
  };
}
function validateUpdateBody(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return next(HttpError(400, "no correct field"));
    }
    return next();
  };
}

async function auth(req, res, next) {
  const authHeader = req.headers.authorization || "";
  const [type, token] = authHeader.split(" ");
  if (type !== "Bearer") {
    throw HttpError(401, "token type is not valid");
  }
  if (!token) {
    throw HttpError(401, "no token provided");
  }
  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await Users.findById(id);
    req.user = user;
  } catch (error) {
    if (
      error.name === "TokenExpiredError" ||
      error.name === "JsonWebTokenError"
    ) {
      throw HttpError(401, "Not authorized");
    }
    throw error;
  }

  next();
}

// multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "tmp");
  },

  // destination: path.join(__dirname, "uploads/"),
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
  // limits: {
  //   fileSize: 1048576,
  // },
});

const upload = multer({
  storage: storage,
});

module.exports = {
  validateBody,
  validateUpdateBody,
  auth,
  upload,
};
