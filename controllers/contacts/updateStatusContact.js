const { HttpError } = require("../../routes/helpers/index");
const { Contacts } = require("../../models/contacts");

async function updateStatusContact(req, res, next) {
  const { contactId } = req.params;

  const { favorite } = req.body;
  if (!favorite) {
    return next(HttpError(400, "missing field favorite"));
  }
  const contact = await Contacts.findById(contactId);
  if (!contact) {
    return next(HttpError(404, "No contact"));
  }
  const updatedContact = await Contacts.findByIdAndUpdate(
    contactId,
    { favorite: favorite },
    {
      new: true,
    }
  );
  res.status(200).json(updatedContact);
}
module.exports = {
  updateStatusContact,
};
