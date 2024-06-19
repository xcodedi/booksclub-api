import dotenv from "dotenv"; // Importing dotenv to load environment variables from .env file
dotenv.config(); // Loading environment variables from .env file into process.env

import express from "express"; // Importing express framework
import db from "./src/models"; // Importing database models (assuming Sequelize ORM)
import routes from "./src/routes"; // Importing application routes

const app = express(); // Creating an instance of express application

app.use(express.json()); // Middleware to parse incoming JSON requests
app.use(routes); // Mounting application routes middleware

const PORT = 4000; // Port number for the server

app.listen(PORT, async () => {
  // Starting the express server and listening on the specified port
  try {
    await db.sequelize.authenticate(); // Authenticating the database connection
    console.log("Connection has been established successfully."); // Logging successful database connection
    console.log(`Server is running on port ${PORT}`); // Logging server start message with port number
  } catch (error) {
    console.error("Unable to connect to the database:", error); // Logging error if database connection fails
  }
});
