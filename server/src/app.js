import http from "http"
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import { corsOptions } from "./utils/constants.js";

const app = express();
const server = http.createServer(app)

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors(corsOptions));

import assignRoute from "./utils/path.js";
import errorMiddleware from "./middlewares/error.middleware.js";

const router = await assignRoute()

app.use("/api", router);

app.get("*", (req, res) => {
    res.status(404).json({ error: "no routes found for this request" })
})

app.post("*", (req, res) => {
    res.status(400).json({ error: "no routes found for this request" })
})
 
app.use(errorMiddleware)

export default server;
