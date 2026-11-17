import jwt from "jsonwebtoken";

export const VerifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Please login first" });
    }

    const token = authHeader.split(" ")[1];

    jwt.verify(token, "codewithayan");

    next();

  } catch (error) {
    return res.status(401).json({ message: "Please login again" });
  }
};