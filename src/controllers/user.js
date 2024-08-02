import Mail from "../libs/mail"; // Importing Mail for email operations
import { differenceInHours } from "date-fns"; // Importing differenceInHours from date-fns to calculate time difference

// Configure AWS SDK
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

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

  // Asynchronous method for updating a user
  async update(req, res) {
    try {
      const { userId } = req;
      const { name, email, password } = req.body;

      // Find the user based on the userId
      const user = await User.findOne({ where: { id: userId } });

      // Handle case where user is not found in the database
      if (!user) {
        return res.status(404).json({ error: "User not found." });
      }

      // Update user details if they are provided in the request body
      if (name) user.name = name;
      if (email) user.email = email;
      if (password) {
        user.password_hash = await bcrypt.hash(password, 8);
      }

      // Save the updated user instance to the database
      await user.save();

      // Return the updated user data in the response
      return res.json({ user });
    } catch (error) {
      console.error("Error during user update:", error); // Log any errors that occur during the user update process
      return res.status(400).json({ error: error?.message }); // Return a 400 status with the error message in case of validation or other errors
    }
  }

  async updateAvatar(req, res) {
    // Define a schema for validation using Yup
    const schema = Yup.object().shape({
      base64: Yup.string().required("Base64 is obligatory"), // Validate that base64 is a string and required
      mime: Yup.string().required("MIME type is obligatory"), // Validate that mime is a string and required
    });

    try {
      // Validate the request body against the schema
      await schema.validate(req.body);

      // Find the user by primary key (ID) using the userId from the authenticated request
      const user = await User.findByPk(req.userId);
      if (!user) {
        // If the user is not found, return a 404 error
        return res.status(404).json({ error: "User not found" });
      }

      // If the user already has an avatar, delete the old avatar from S3
      if (user.avatar_url) {
        const splitted = user.avatar_url.split("/"); // Split the URL by '/'
        const oldKey = splitted[splitted.length - 1]; // Get the last part of the URL, which is the key
        const deleteResponse = await UploadImage.delete(oldKey); // Delete the old avatar from S3
        console.log("Delete response:", deleteResponse);
        if (deleteResponse.error) {
          return res.status(500).json({ error: deleteResponse.error });
        }
      }

      // Destructure base64 and mime from the request body
      const { base64, mime } = req.body;
      // Generate a unique key for the new avatar using the user ID and a UUID
      const key = `avatars/${user.id}_${uuidv4()}`;

      // Upload the new image to AWS S3 and get the URL of the uploaded image
      const avatarUrl = await UploadImage.upload(key, base64, mime);

      // Update the user's avatar URL in the database
      user.avatar_url = avatarUrl;
      await user.save();

      // Return the updated user information as a JSON response
      return res.json({ user });
    } catch (error) {
      // Log the error to the console and return a 400 error with the error message
      console.error("Error updating avatar:", error);
      return res.status(400).json({ error: error.message });
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
          .email("Invalid email") // Validate email format
          .required("Email is required!"), // Ensure email is present
      });

      // Validate the request body against the schema
      await schema.validate(req.body);

      // Find the user based on the email provided in the request
      const user = await User.findOne({ where: { email: req.body.email } });

      // Handle case where user is not found in the database
      if (!user) {
        return res.status(404).json({ error: "User does not exist!" }); // Not found status if user not found
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
      console.log(
        `Sending forgot password email to ${email} with token ${token}`
      );

      // Send forgot password email and capture the result
      const mailResult = await Mail.sendforgotemail(email, name, token);

      console.log({ mailResult }); // Log the result of sending email

      // Check if sending email was successful
      if (mailResult.error) {
        // Return 500 status with error message if email sending failed
        return res.status(500).json({ error: "Failed to send email." });
      }

      // Return success message in JSON response
      return res.json({ success: true });
    } catch (error) {
      console.error("Error during forgot password:", error); // Log any errors that occur during the forgot password process
      // Return 400 status with error message in case of validation or other errors
      return res.status(400).json({ error: error?.message });
    }
  }

  // Asynchronous method to handle reset password
  async resetPassword(req, res) {
    try {
      // Validation schema for the request body using Yup
      const schema = Yup.object().shape({
        email: Yup.string()
          .email("Invalid email") // Validate email format
          .required("Email is required!"), // Ensure email is present
        token: Yup.string().required("Token is required"), // Ensure token is present
        password: Yup.string()
          .required("Password is required") // Ensure password is present
          .min(6, "Password must be at least 6 characters long"), // Password must be at least 6 characters long
      });

      // Validate the request body against the schema
      await schema.validate(req.body);

      // Find the user based on the email provided in the request
      const user = await User.findOne({ where: { email: req.body.email } });

      // Handle case where user is not found in the database
      if (!user) {
        return res.status(404).json({ error: "User does not exist!" }); // Not found status if user not found
      }

      // Handle case where reset password token or timestamp is missing
      if (!user.reset_password_token || !user.reset_password_token_sent_at) {
        return res.status(400).json({ error: "Password reset not requested" }); // Bad request status if reset not requested
      }

      // Calculate the difference in hours between the token sent time and the current time
      const hoursDifference = differenceInHours(
        new Date(),
        user.reset_password_token_sent_at
      );

      // Handle case where the token has expired (more than 2 hours old)
      if (hoursDifference > 2) {
        return res.status(400).json({ error: "Token expired" }); // Bad request status if token expired
      }

      // Compare the token provided in the request with the hashed token stored in the database
      const isTokenValid = await bcrypt.compare(
        req.body.token,
        user.reset_password_token
      );

      // Handle case where the token comparison fails (invalid token)
      if (!isTokenValid) {
        return res.status(401).json({ error: "Invalid token" }); // Unauthorized status if token is invalid
      }

      // Hash the new password provided in the request
      const newHashedPassword = await bcrypt.hash(req.body.password, 8);

      // Update user with the new hashed password and clear the reset token and timestamp
      await user.update({
        password_hash: newHashedPassword,
        reset_password_token: null,
        reset_password_token_sent_at: null,
      });

      // Return success message in JSON response
      return res.json({ success: true });
    } catch (error) {
      console.error("Error during reset password:", error); // Log any errors that occur during the reset password process
      return res.status(400).json({ error: error?.message }); // Return a 400 status with the error message in case of validation or other errors
    }
  }
}

// Export an instance of the UserController class
export default new UserController();
