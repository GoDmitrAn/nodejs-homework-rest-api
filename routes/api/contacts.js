const express = require("express");
const contactsDb = require("../../models/contacts");
const { HttpError } = require("../helpers/index");
const Joi = require("joi");

const router = express.Router();

router.get("/", async (req, res, next) => {
  const contacts = await contactsDb.listContacts();
  if (!contacts) {
    return next(HttpError(404, "No contacts"));
  }
  return res.json(contacts);
});

router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await contactsDb.getContactById(contactId);
  if (!contact) {
    next(HttpError(404, "Contact not found"));
  }
  return res.json(contact);
});

router.post("/", async (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().alphanum().min(3).required(),
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .required(),
    phone: Joi.string().required(),
  });
  const { error } = schema.validate(req.body);

  if (error) {
    return next(HttpError(400, "missing required name field"));
  }
  const { name, email, phone } = req.body;
  const newContact = await contactsDb.addContact(name, email, phone);
  res.status(201).json(newContact);
});

router.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await contactsDb.getContactById(contactId);
  if (!contact) {
    return next(HttpError(404, "No contact"));
  }
  await contactsDb.removeContact(contactId);
  return res.status(200).json({ message: "contact deleted" });
});

router.put("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;

  const schema = Joi.object({
    name: Joi.string().alphanum().min(3),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),
    phone: Joi.string(),
  });
  const { error } = schema.validate(req.body);

  if (error) {
    return next(HttpError(400, "no correct field"));
  }

  const body = req.body;
  if (Object.keys(body).length == 0) {
    return next(HttpError(400, "missing fields"));
  }
  const contact = await contactsDb.getContactById(contactId);
  if (!contact) {
    return next(HttpError(404, "No contact"));
  }
  const updatedContact = await contactsDb.updateContact(contactId, body);
  res.status(200).json(updatedContact);
});

module.exports = router;
