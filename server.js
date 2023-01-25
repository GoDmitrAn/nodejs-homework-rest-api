// const app = require('./app')

// app.listen(3000, () => {
//   console.log("Server running. Use our API on port: 3000")
// })

const mongoose = require("mongoose");
const dotenv = require("dotenv");
mongoose.set("strictQuery", false);
dotenv.config();

const { HOST_URI } = process.env;

async function main() {
  try {
    await mongoose.connect(HOST_URI);
    console.log("connected tomongodb");
  } catch (error) {
    console.error("error while connecting to mongodb", error.message);
    process.exit(1);
  }
}
main();
