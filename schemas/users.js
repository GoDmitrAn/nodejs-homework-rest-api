const Joi = require("joi");
const usersSchema = Joi.object({
  password: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .min(4)
    .required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),

  subscription: Joi.string(),
  token: Joi.string(),
});

module.exports = {
  usersSchema,
};
