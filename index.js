import express from "express";
import db from "./src/models";
import usercontroller from "./src/controllers/user";
const app = express();

app.use(express.json());
app.post("/", usercontroller.create);
const PORT = 4000;
app.listen(PORT, async () => {
  try {
    await db.sequelize.authenticate();
    console.log("Connection has been established successfully.");
    console.log(`Server is running on port ${PORT}`);
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
});
