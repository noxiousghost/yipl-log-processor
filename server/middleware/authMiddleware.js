import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.status(403).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, "your_jwt_secret");
    req.user = decoded;
    next();
  } catch (err) {
    console.error("Invalid token:", err); // Debugging
    res.status(401).json({ message: "Unauthorized" });
  }
};
