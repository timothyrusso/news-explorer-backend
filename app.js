const express = require("express");
const helmet = require('helmet');
const mongoose = require("mongoose");
const { mongoDbAdress, limiter } = require("./utils/constants");

const app = express();
const { PORT = 3000 } = process.env;

mongoose.connect(mongoDbAdress, {
  useNewUrlParser: true,
});

app.use(limiter);

app.use(express.json()); // To parse the incoming requests with JSON payloads
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

app.use(helmet());

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`); // eslint-disable-line no-console
});
