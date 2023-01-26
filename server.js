const app = require("./app");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

mongoose.set("strictQuery", false);
dotenv.config();

const { HOST_URI } = process.env;

async function main() {
  try {
    await mongoose.connect(HOST_URI);
    console.log("Database connection successful");

    app.listen(3000, () => {
      console.log("Server running. Use our API on port: 3000");
    });

    //saved new contact into db
    // const savedContact = await Contact.create({
    //   name: "NewContact",
    //   email: "my@mail.com",
    //   phone: "1234567890",
    //   favorite: "true",
    // });
    // console.log("Create new contact", savedContact);

    //read all from db
    // const contacts = await Contact.find({});
    // console.log("contacts", contacts);

    //read using filter
    // const contacts = await Contact.find({ name: "Abbot Franks" });
    // console.log("contacts", contacts);

    //find one
    // const contact = await Contact.findOne({ _id: "63d18b42406d2d0631139f60" });

    // //find by id
    // const contact = await Contact.findById({ _id: "63d2b52ed8999f692ba2dbf9" });

    // update name
    // const contact = await Contact.findOne({ _id: "63d2b52ed8999f692ba2dbf9" });
    // contact.name = "Updated newContact";
    // await contact.save();

    // //find and update
    // const contact = await Contact.findByIdAndUpdate(
    //   { _id: "63d2b52ed8999f692ba2dbf9" },
    //   { name: "Updated name3" },
    //   { new: true }
    // );

    // // remove
    // const contact = await Contact.findByIdAndRemove({
    //   _id: "63d2b52ed8999f692ba2dbf9",
    // });

    // console.log("contact", contact);
  } catch (error) {
    console.error("error while connecting to database", error.message);
    process.exit(1);
  }
}
main();
