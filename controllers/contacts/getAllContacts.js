const { HttpError } = require("../../routes/helpers/index");
const { Contacts } = require("../../models/contacts");

async function getContacts(req, res, next) {
  const contacts = await Contacts.find({});
  if (!contacts) {
    return next(HttpError(404, "No contacts"));
  }
  return res.json(contacts);
}
module.exports = {
  getContacts,
};
