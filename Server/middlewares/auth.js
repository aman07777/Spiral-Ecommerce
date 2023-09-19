import jwt from "jsonwebtoken";

import catchAsync from "../utils/catchAsync.js";
import createError from "../utils/createError.js";

import User from "../models/User.js";

export const protect = catchAsync(async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!(authHeader && authHeader.toLowerCase().startsWith("bearer")))
    throw createError(
      401,
      "You are not logged in. Please login to get access."
    );
  const token = authHeader.split(" ")[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const currentUser = await User.findById(decoded._id);
  if (!currentUser)
    throw createError(
      401,
      "The user belonging to this token does no longer exist."
    );
  req.user = currentUser;
  next();
});

export const permission = (role) => (req, res, next) => {
  if (role !== req.user.role)
    throw createError(403, "You are not allowed to access this route.");
  next();
};
