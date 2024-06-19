import { User } from "../models"; // Importing the User model
import * as Yup from "yup"; // Importing Yup for schema validation
import jwt from "jsonwebtoken"; // Importing jsonwebtoken for JWT operations
import bcrypt from "bcrypt"; // Importing bcrypt for password hashing
import Mail from "../libs/mail";

class UserController {
  // Asynchronous method for user login
  async login(req, res) {
    try {
      // Validation schema for the request body using Yup
      const schema = Yup.object().shape({
        email: Yup.string()
          .email("Invalid email") // Validate email format
          .required("Email is required!"), // Ensure email is present
        password: Yup.string().required("Password is required"), // Ensure password is present
      });

      // Validate the request body against the schema
      await schema.validate(req.body);

      // Find the user based on the email provided in the request
      const user = await User.findOne({ where: { email: req.body.email } });

      // Handle case where user is not found in the database
      if (!user) {
        return res.status(401).json({ error: "Invalid email or password." }); // Unauthorized status if user not found
      }

      // Compare the password provided in the request with the hashed password stored in the database
      const checkPassword = await bcrypt.compare(
        req.body.password,
        user.password_hash
      );

      // Handle case where the password comparison fails (incorrect password)
      if (!checkPassword) {
        return res.status(401).json({ error: "Invalid email or password." }); // Unauthorized status if password is incorrect
      }

      // Generate JWT token using the user's ID and a secret hash from environment variables
      const token = jwt.sign({ id: user.id }, process.env.JWT_HASH, {
        expiresIn: "30d", // Token expires in 30 days
      });

      // Destructure user object to extract required fields
      const { id, name, email, avatar_url, createdAt } = user;

      // Return the user data (id, name, email, avatar_url, createdAt) and the JWT token in the response
      return res.json({
        user: {
          id,
          name,
          email,
          avatar_url,
          createdAt,
        },
        token, // Include JWT token in the response
      });
    } catch (error) {
      console.error("Error during login:", error); // Log any errors that occur during the login process
      return res.status(400).json({ error: error?.message }); // Return a 400 status with the error message in case of validation or other errors
    }
  }

  // Asynchronous method for creating a new user
  async create(req, res) {
    try {
      // Validation schema for creating a new user using Yup
      const schema = Yup.object().shape({
        name: Yup.string()
          .required("Name is required.") // Ensure name is present
          .min(3, "Name must be at least 3 characters long"), // Name must be at least 3 characters long
        email: Yup.string()
          .email("Invalid email") // Validate email format
          .required("Email is required!"), // Ensure email is present
        password: Yup.string()
          .required("Password is required") // Ensure password is present
          .min(6, "Password must be at least 6 characters long."), // Password must be at least 6 characters long
      });

      // Validate the request body against the schema
      await schema.validate(req.body);

      // Check if a user with the same email already exists in the database
      const existedUser = await User.findOne({
        where: { email: req.body.email },
      });

      // Handle case where a user with the same email already exists
      if (existedUser) {
        return res.status(400).json({ error: "User already exists." }); // Bad request status if user already exists
      }

      // Hash the password provided in the request using bcrypt with a salt factor of 8
      const hashPassword = await bcrypt.hash(req.body.password, 8);

      // Create a new instance of the User model with the provided data, storing the hashed password in the database
      const user = new User({
        ...req.body,
        password: "", // Clear plain password from user object
        password_hash: hashPassword, // Store hashed password in the database
      });

      // Save the new user instance to the database
      await user.save();

      // Return the user data in the response
      return res.json({ user });
    } catch (error) {
      console.error("Error during user creation:", error); // Log any errors that occur during the user creation process
      return res.status(400).json({ error: error?.message }); // Return a 400 status with the error message in case of validation or other errors
    }
  }

  // Asynchronous method to get a user by ID
  async getuser(req, res) {
    try {
      // Check if req.userId is falsy (null, undefined, empty string, etc.)
      if (!req.userId) {
        // Return a JSON response with a 400 status code and an error message if ID was not provided
        return res.status(400).json({ error: "Id was not provided" });
      }

      // Use the User model to find a user in the database where the ID matches req.userId converted to a number
      const user = await User.findOne({ where: { id: Number(req.userId) } });

      // If user is not found in the database
      if (!user) {
        // Return a JSON response with a 404 status code and an error message if user is not found
        return res.status(404).json({ error: "User not found" });
      }

      // Return a JSON response with the user object
      return res.json(user);
    } catch (error) {
      console.error("Error during get user:", error); // Log any errors that occur during the get user process
      return res.status(500).json({ error: "Internal server error" }); // Return a 500 status with a generic error message in case of unexpected errors
    }
  }

  // Asynchronous method to handle forgot password
  async forgotPassword(req, res) {
    try {
      // Validation schema for the request body using Yup
      const schema = Yup.object().shape({
        email: Yup.string()
          .email("Invalid email format") // Validate email format
          .required("Email is required"), // Ensure email is present
      });

      // Validate the request body against the schema
      await schema.validate(req.body);

      // Find the user based on the email provided in the request
      const user = await User.findOne({ where: { email: req.body.email } });

      // Handle case where user is not found in the database
      if (!user) {
        return res.status(404).json({ error: "User does not exist" }); // Not found status if user not found
      }

      // Generate a random token and hash it using bcrypt
      const reset_password_token_sent_at = new Date();
      const token = Math.random().toString().slice(2, 8);
      const reset_password_token = await bcrypt.hash(token, 8);

      // Update user with the hashed token and timestamp
      await user.update({
        reset_password_token_sent_at,
        reset_password_token,
      });

      // Destructure user object to extract email and name
      const { email, name } = user;

      // Send email with reset password token
      const mailResult = await Mail.sendforgotemail(email, name, token);

      // Handle case where the email could not be sent
      if (!mailResult.success) {
        return res.status(500).json({ error: "Failed to send reset email" }); // Internal Server Error if email sending fails
      }

      console.log({ mailResult });

      // Return success message in JSON response
      return res.json({ success: true });
    } catch (error) {
      // Return 400 status with error message in case of validation or other errors
      return res.status(400).json({ error: error?.message });
    }
  }
}

// Export an instance of the UserController class
export default new UserController();
