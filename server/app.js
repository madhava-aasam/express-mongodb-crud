import express, { json, urlencoded } from "express";
import { join } from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import indexRouter from "./routes/index";
import usersRouter from "./routes/users";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const _connection = "mongodb://localhost/knotassignment";

// console.log("connection -------------", _connection);

mongoose.connect(_connection, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();

// allow origin http://localhost:3000
const corsOptions = function (req, res, next) {
  const whitelist = ["http://localhost:3000"];
  const origin = req.headers.origin;
  if (whitelist.indexOf(origin) > -1) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Accept,Content-Type,Authorization, x-xsrf-token"
  );
  next();
};
app.use(corsOptions);

app.use(logger("dev"));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(join(__dirname, "../public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

export default app;
