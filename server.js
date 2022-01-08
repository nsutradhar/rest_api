//All package imports
const express = require("express");
const app = express();
const morgan = require("morgan");
const BodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const PORT = process.env.PORT;
require("./src/db/conn");

//All internal routes
const HomeRoute = require("./src/routes/HomeRoutes");
const UserRoute = require("./src/routes/UserRoutes");
const ProductRoute = require("./src/routes/ProductRoute");
const OrderRoute = require("./src/routes/OrderRoutes");

//All Midleware
app.use(morgan("dev"));
app.use("/uploads", express.static("uploads"));
app.use(BodyParser.urlencoded({ extended: false }));
app.use(BodyParser.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE");
    return res.status(200).json({});
  }
  next();
});

//All routes
app.use("/", HomeRoute);
app.use("/user", UserRoute);
app.use("/product", ProductRoute);
app.use("/order", OrderRoute);

app.use((req, res, next) => {
  const error = new Error("oho this page not found");
  error.status = 400;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

//Listner
app.listen(PORT, () => {
  console.log(`server is listening on port http://127.0.0/${PORT}`);
});
