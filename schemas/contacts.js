const Joi = require("joi");

const createContactSchema = Joi.object({
  name: Joi.string().alphanum().min(3).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  phone: Joi.string().required(),
});
const updateContactSchema = Joi.object({
  name: Joi.string().alphanum().min(3),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  phone: Joi.string(),
});
module.exports = {
  createContactSchema,
  updateContactSchema,
};
