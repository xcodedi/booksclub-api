import AWS from "aws-sdk"; // Import the AWS SDK for interacting with AWS services
import { v4 as uuidv4 } from "uuid"; // Import uuid for generating unique IDs for images

// Extract AWS configuration variables from environment variables
const {
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
  AWS_REGION,
  AWS_BUCKET_NAME,
} = process.env;

// Configure the AWS SDK with region and credentials
AWS.config.update({
  region: AWS_REGION, // AWS region where the S3 bucket is located
  credentials: {
    accessKeyId: AWS_ACCESS_KEY_ID, // AWS access key ID
    secretAccessKey: AWS_SECRET_ACCESS_KEY, // AWS secret access key
  },
});

// Define a class for handling image uploads to S3
class UploadImage {
  // Method for uploading an image to S3
  async upload(key, base64, mime) {
    try {
      // Convert the base64 string to a buffer by removing the data URL scheme
      const buffer = Buffer.from(
        base64.replace(/^data:image\/\w+;base64,/, ""), // Remove data URL scheme
        "base64" // Decode the base64 string
      );

      // Create a new S3 instance
      const s3 = new AWS.S3({ apiVersion: "2006-03-01" });

      // Define parameters for the S3 upload
      const params = {
        Bucket: AWS_BUCKET_NAME, // The S3 bucket name
        Key: key, // The key (path) where the file will be stored in S3
        Body: buffer, // The file data
        ContentEncoding: "base64", // Encoding type of the file
        ContentType: mime, // MIME type of the file
        ACL: "public-read", // Access control list setting for the file (public-read)
      };

      // Upload the file to S3 and return the file URL
      const data = await s3.upload(params).promise(); // Wait for the upload to complete
      return data.Location; // Return the URL of the uploaded file
    } catch (error) {
      // Log and throw any errors that occur during the upload
      console.error("Error uploading image:", error);
      throw error;
    }
  }
  // Method for deleting an image from S3
  async delete(key) {
    try {
      // Define parameters for the S3 delete
      const params = {
        Bucket: AWS_BUCKET_NAME, // The S3 bucket name
        Key: key, // The key (path) of the file to delete in S3
      };

      // Create a new S3 instance
      const s3 = new AWS.S3({ apiVersion: "2006-03-01" });

      // Delete the file from S3 and return the response
      const response = await s3.deleteObject(params).promise(); // Wait for the delete to complete
      return response; // Return the response of the delete operation
    } catch (error) {
      // Log and throw any errors that occur during the delete
      console.error("Error deleting image:", error);
      throw error;
    }
  }
}

// Export an instance of the UploadImage class
export default new UploadImage();
