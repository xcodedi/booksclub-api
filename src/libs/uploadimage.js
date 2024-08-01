import AWS from "aws-sdk";
import { v4 as uuidv4 } from "uuid"; // Para gerar IDs únicos para as imagens

const {
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
  AWS_REGION,
  AWS_BUCKET_NAME,
} = process.env;

AWS.config.update({
  region: AWS_REGION,
  credentials: {
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
  },
});

class UploadImage {
  async upload(key, base64, mime) {
    try {
      const buffer = Buffer.from(
        base64.replace(/^data:image\/\w+;base64,/, ""),
        "base64"
      );
      const s3 = new AWS.S3({ apiVersion: "2006-03-01" });

      const params = {
        Bucket: AWS_BUCKET_NAME,
        Key: key,
        Body: buffer,
        ContentEncoding: "base64",
        ContentType: mime,
        ACL: "public-read",
      };

      const data = await s3.upload(params).promise();
      return data.Location;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  }
}

export default new UploadImage();
