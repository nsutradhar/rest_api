const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.status(200).json({
    message: "its working",
  });
});

router.post("/", (req, res, next) => {
  res.status(201).json({
    message: "its working from post request",
  });
});

module.exports = router;
