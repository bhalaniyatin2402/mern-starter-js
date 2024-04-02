import * as yup from "yup";

const validPassword = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

// validation of different inputs
const username = yup
  .string()
  .min(3, "atleast 3 charater required")
  .max(20, "must be 20 character or less")
  .required("please enter your name");

const email = yup
  .string()
  .email("invalid email address")
  .required("please enter your email");

const password = yup
  .string()
  .min(6, "atleast 6 character long")
  .max(16, "must be 16 character or less")
  .matches(validPassword, "number & special character requred")
  .required("please enter your password");

// validation for forms
export const registerSchema = yup.object({ username, email, password });

export const loginSchema = yup.object({ email, password });
