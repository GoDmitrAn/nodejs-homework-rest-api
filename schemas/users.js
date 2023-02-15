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
  verificationToken: Joi.string(),
  verify: Joi.string(),
});
const usersLoginSchema = Joi.object({
  password: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .min(4)
    .required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),

  subscription: Joi.string(),
  token: Joi.string(),
  verificationToken: Joi.string().min(7).required(),
  verify: Joi.string(),
});

module.exports = {
  usersSchema,
  usersLoginSchema,
};
