const express = require("express");
const router = express.Router();
const multer = require("multer");
const checkAuth = require("../middleware/check_auth");
const orderController = require("../controller/product_controller");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  //reject a file
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(new Error("File format not supported"), false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

router.get("/", orderController.get_all_product);

router.get("/:productId", orderController.geting_single_product);

router.post(
  "/",
  checkAuth,
  upload.single("productImage"),
  orderController.post_request_product
);

router.delete("/:productId", checkAuth, orderController.delete_product);

router.patch("/:productId", checkAuth, orderController.update_product);

module.exports = router;
