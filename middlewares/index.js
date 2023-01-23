const { HttpError } = require("../routes/helpers");

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
module.exports = {
  validateBody,
  validateUpdateBody,
};
