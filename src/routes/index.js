import { Router } from "express";
import UserController from "../controllers/user"; // Ensure this path is correct
import authMiddleware from "../middlewares/auth";

const routes = new Router();

// unauthenticated routes
routes.post("/user", UserController.create); // Route for creating a new user
routes.post("/login", UserController.login); // Route for user login
routes.post("/forgotpassword", UserController.forgotPassword); // Route for requesting password reset

// authenticated routes
routes.use(authMiddleware); // Middleware to ensure authentication for the following routes
routes.get("/user/", UserController.getuser); // Route for retrieving user information

export default routes; // Exporting the configured routes
