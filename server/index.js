import { config } from "dotenv";
config();
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectToDB from "./config/db.config.js";

const app = express();

app.use(
  cors({
    origin: process.env.FRONT_URL,
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// importing all route
import userRoutes from "./routes/user.routes.js";
import errorMiddleware from "./middlewares/error.middleware.js";

// assiging diffrent route to base url
app.use("/api/v1/user", userRoutes);

// handle all error to this middleware
app.use(errorMiddleware);

const port = process.env.PORT;

app.listen(port, async () => {
  await connectToDB();
  console.log(`server is  running on port: ${port}`);
});
