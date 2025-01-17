import JWT from "jsonwebtoken";
import User from "../models/user.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";

export const isLooggedIn = asyncHandler(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    throw new ApiError(401, "invalid user or token is expired");
  }

  const { id } = JWT.verify(token, process.env.JWT_SECRET);

  if (!id) {
    throw new ApiError(401, "invalid user or token is expired");
  }

  const user = await User.findById(id);

  if (!user) {
    throw new ApiError(401, "invalid user or token is expired");
  }

  req.user = user;
  next();
});
