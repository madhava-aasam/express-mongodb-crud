import express, { json, urlencoded } from "express";
import { join } from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import indexRouter from "./routes/index";
import usersRouter from "./routes/users";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const _connection =
  "mongodb+srv://" +
  process.env.DB_USER +
  ":" +
  process.env.DB_PASSWORD +
  "@cluster0.0hui4.mongodb.net/" +
  process.env.DATABASE +
  "?retryWrites=true&w=majority";

mongoose.connect(_connection, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();

app.use(logger("dev"));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(join(__dirname, "../public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

export default app;
