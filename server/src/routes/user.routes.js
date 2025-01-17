import { Router } from "express";
import { isLooggedIn } from "../middlewares/auth.middleware.js";
import {
  register,
  login,
  updateUser,
  logout,
  getUserDetails,
  getUsersList,
} from "../controllers/user.controllers.js";

const router = Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/list").get(isLooggedIn, getUsersList)
router
  .route("/me")
  .get(isLooggedIn, getUserDetails)
  .put(isLooggedIn, updateUser);
router.route("/logout").get(isLooggedIn, logout);

export default router;
