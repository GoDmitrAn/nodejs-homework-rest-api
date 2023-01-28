const { Contacts } = require("../../models/contacts");
async function createContact(req, res, next) {
  const { name, email, phone, favorite } = req.body;
  const newContact = await Contacts.create({ name, email, phone, favorite });
  res.status(201).json(newContact);
}
module.exports = {
  createContact,
};
