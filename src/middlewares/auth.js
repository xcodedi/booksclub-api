import jwt from "jsonwebtoken";

export default async (req, res, next) => {
  // Extract the authorization header from the request headers
  const authHeader = req.headers.authorization;

  // Check if authorization header is missing
  if (!authHeader) {
    return res.status(401).json({ error: "Token not provided" });
  }

  // Extract the token from the authorization header (assuming Bearer token format)
  const [, token] = authHeader.split(" ");

  // Log the authorization header for debugging purposes
  console.log({ authHeader });

  try {
    // Verify the token using jsonwebtoken
    const decoded = jwt.verify(token, process.env.JWT_HASH);

    // Attach the decoded payload to the request object for further use in the route handlers
    req.userId = decoded.id;

    // Proceed to the next middleware or route handler
    next();
  } catch (err) {
    // Return a 401 Unauthorized error if token verification fails
    return res.status(401).json({ error: "Token invalid" });
  }
};
