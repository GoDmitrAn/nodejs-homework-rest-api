const { HttpError } = require("../../routes/helpers/index");
const { Contacts } = require("../../models/contacts");

async function updateContact(req, res, next) {
  const { contactId } = req.params;

  const body = req.body;
  if (Object.keys(body).length === 0) {
    return next(HttpError(400, "missing fields"));
  }
  const contact = await Contacts.findById(contactId);
  if (!contact) {
    return next(HttpError(404, "No contact"));
  }
  const updatedContact = await Contacts.findByIdAndUpdate(
    contactId,
    { ...body },
    { new: true }
  );
  res.status(200).json(updatedContact);
}
module.exports = {
  updateContact,
};
