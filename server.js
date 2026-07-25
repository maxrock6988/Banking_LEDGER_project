require("dotenv").config({ path: "./src/.env" });

const app = require("./src/app");
const connectToDB = require("./src/db");

connectToDB();

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});