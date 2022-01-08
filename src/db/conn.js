const mongoose = require("mongoose");
const db = process.env.DATABASE;

mongoose
  .connect(db)
  .then(() => {
    console.log("connection successfully");
  })
  .catch(() => {
    console.log("no connection");
  });

mongoose.Promise = global.Promise;
