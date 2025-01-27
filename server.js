const app = require("./app");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

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
  } catch (error) {
    console.error("error while connecting to database", error.message);
    process.exit(1);
  }
}
main();
