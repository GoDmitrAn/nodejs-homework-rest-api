const { HttpError } = require("../../routes/helpers/index");
const { Contacts } = require("../../models/contacts");

async function getContacts(req, res, next) {
  const { limit = 20, page = 1 } = req.query;
  const skip = (page - 1) * limit;
  const contacts = await Contacts.find({}).skip(skip).limit(limit);
  if (!contacts) {
    return next(HttpError(404, "No contacts"));
  }
  return res.json(contacts);
}
module.exports = {
  getContacts,
};
