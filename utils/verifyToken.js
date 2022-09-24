import jwt from "jsonwebtoken";
import { createError } from "./error.js";

export const verifyToken = (request, response, next) => {
  const token = request.cookies.access_token;
  if (!token) return next(createError(401, "Not authenticated!"));
  
  jwt.verify(token, process.env.JWT_SECRET_KEY, (error, user) => {
    if (error) return next(createError(403, "Token is not valid!"));
    request.user = user;
    next();
  });
};
