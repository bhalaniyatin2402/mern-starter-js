import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, "username is reqruied"],
    minLength: [3, "atleast  3 character required"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "email is required"],
    unique: [true, "email is already in use"],
    trim: true,
  },
  password: {
    type: String,
    required: [true, "password is requried"],
    minLength: [8, "password atleaset 8 charcter long"],
    maxLength: [16, "password must less then 16 char long"],
    select: false,
  },
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

userSchema.methods = {
  generateAuthToken: async function () {
    return JWT.sign({ id: this._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRY,
    });
  },
};

const User = model("User", userSchema);

export default User;
