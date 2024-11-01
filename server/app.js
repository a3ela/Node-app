const config = require("./utils/config");
const middleware = require("./utils/middleware");
const logger = require("./utils/logger");
const express = require("express");
require("express-async-errors");
const app = express();
const notesRouter = require("./controllers/notes");
const cors = require("cors");
const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

logger.info("mongoDB_url: ", config.MONGODB_URL);

mongoose
  .connect(config.MONGODB_URL)
  .then(() => {
    logger.info("connected to mongodb");
  })
  .catch((error) =>
    logger.error("error connecting to mongoDB: ", error.message)
  );

app.use(cors());
app.use(express.static("dist"));
app.use(express.json());
app.use(middleware.requestLogger);

app.use("/api/notes", notesRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
