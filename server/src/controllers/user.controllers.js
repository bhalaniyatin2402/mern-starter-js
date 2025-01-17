import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { AppResponse } from "../utils/ApiResponse.js";

const cookieOptions = {
  maxAge: 24 * 60 * 60 * 1000,  // 24 hours
  secture: true,
  httpOnly: true,
};

/**
 * @REGISTRATION
 * @ROUTE @POST
 * @ACCESS public {{url}}/api/v1/user/register
 */

export const register = asyncHandler(async (req, res, next) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    throw new ApiError(400, "all filed are required");
  }

  if (username.length < 3) {
    throw new ApiError(400, "name atleast 3 character long");
  }

  if (password.length < 8 || password.length > 16) {
    throw new ApiError(
      400,
      "password length must in between 8 to 16 character"
    );
  }

  const isUserExist = await User.findOne({ email });

  if (isUserExist) {
    throw new ApiError(400, "user with email already exist");
  }

  const user = new User(req.body);

  if (!user) {
    throw new ApiError(400, "process fail to create user");
  }

  const token = await user.generateAuthToken();

  if (!token) {
    throw new ApiError(400, "token not created successfully");
  }

  res.cookie("token", token, cookieOptions);

  await user.save();

  res.status(200).json(new AppResponse(201, [], "user created successfully"));
});

/**
 * @LOGIN
 * @ROUTE @POST
 * @ACCESS public {{url}}/api/v1/user/login
 */

export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "email and password is required for login");
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new ApiError(400, "invalid username or password");
  }

  const verifyPasswrd = await bcrypt.compare(password, user.password);

  if (!verifyPasswrd) {
    throw new ApiError(400, "invalid username or password");
  }

  user.password = undefined;

  const token = await user.generateAuthToken();

  if (!token) {
    throw new ApiError(400, "token not generated successfully");
  }

  res.cookie("token", token, cookieOptions);

  res.status(200).json(new AppResponse(200, [], "user login successful"));
});

/**
 * @LOGIN
 * @ROUTE @POST
 * @ACCESS public {{url}}/api/v1/user/login
 */

export const getUserDetails = asyncHandler(async (req, res, next) => {
  res.status(200).json(new AppResponse(200, req.user, "user details"));
});

/**
 * @UPDATE_User
 * @ROUTE @PUT
 * @ACCESS loggedin user only {{url}}/api/v1/user/update
 */

export const updateUser = asyncHandler(async (req, res, next) => {
  await User.findOneAndUpdate(
    { _id: req.user },
    {
      $set: req.body,
    }
  );

  res.status(200).json(new AppResponse(200, {}, "user updated successful"));
});

/**
 * @LOGOUT
 * @GET
 * @ACCESS loggedin user only {{url}}/api/v1/user/logout
 */

export const logout = asyncHandler(async (req, res, next) => {
  res.cookie("token", "", {
    maxAge: 0,
    secure: true,
    httpOnly: true,
  });
  res.clearCookie("token");

  res.status(200).json(new AppResponse(204, {}, "user logged out"));
});
