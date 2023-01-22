const fs = require("fs/promises");
const { nanoid } = require("nanoid");
const path = require("path");
const contactsPath = path.resolve(__dirname, "contacts.json");

async function readContactsDb() {
  try {
    const dbRaw = await fs.readFile(contactsPath, "utf8");
    const db = JSON.parse(dbRaw);
    return db;
  } catch (error) {
    console.log("Please reload", error);
  }
}
async function writeContactsDb(db) {
  try {
    await fs.writeFile(contactsPath, JSON.stringify(db, null, 2));
  } catch (error) {
    console.log(error);
  }
}

const listContacts = async () => {
  try {
    let list = await readContactsDb();
    return list;
  } catch (error) {
    console.log(error);
  }
};

const getContactById = async (contactId) => {
  try {
    const db = await readContactsDb();
    let contact = db.find((element) => element.id === String(contactId));

    return contact;
  } catch (error) {
    console.log(error);
  }
};

const removeContact = async (contactId) => {
  try {
    const db = await readContactsDb();
    let index = db.findIndex((element) => element.id === String(contactId));
    db.splice(index, 1);
    await writeContactsDb(db);
  } catch (error) {
    console.log(error);
  }
};

const addContact = async (name, email, phone) => {
  try {
    id = nanoid();
    const contactUser = { id, name, email, phone };
    const db = await readContactsDb();
    db.push(contactUser);
    await writeContactsDb(db);
    return contactUser;
  } catch (error) {
    console.log(error);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const db = await readContactsDb();
    let contact = db.find((element) => element.id === String(contactId));
    let index = db.findIndex((element) => element.id === String(contactId));
    let updatedContact = { ...contact, ...body };
    console.log(updatedContact);
    db.splice(index, 1, updatedContact);
    await writeContactsDb(db);
    return updatedContact;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
