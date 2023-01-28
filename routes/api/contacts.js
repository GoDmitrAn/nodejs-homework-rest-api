const express = require("express");

const { tryCatchWrapper } = require("../helpers/index");
const {
  getContacts,
  getContact,
  createContact,
  deleteContact,
  updateContact,
  updateStatusContact,
} = require("../../controllers/contacts/index");
const { validateBody, validateUpdateBody } = require("../../middlewares/index");
const {
  createContactSchema,
  updateContactSchema,
} = require("../../schemas/contacts");

const router = express.Router();

router.get("/", tryCatchWrapper(getContacts));

router.get("/:contactId", tryCatchWrapper(getContact));

router.post(
  "/",
  validateBody(createContactSchema),
  tryCatchWrapper(createContact)
);

router.delete("/:contactId", tryCatchWrapper(deleteContact));

router.put(
  "/:contactId",
  validateUpdateBody(updateContactSchema),
  tryCatchWrapper(updateContact)
);
router.patch("/:contactId/favorite", tryCatchWrapper(updateStatusContact));

module.exports = router;
