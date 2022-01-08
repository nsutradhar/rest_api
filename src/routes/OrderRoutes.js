const express = require("express");
const router = express.Router();

const checkAuth = require("../middleware/check_auth");

const orderController = require("../controller/order_controller");

router.get("/", checkAuth, orderController.get_req_orders);

router.get("/:orderId", checkAuth, orderController.get_single_order);

router.post("/", checkAuth, orderController.post_req_order);

router.delete("/:orderId", checkAuth, orderController.delete_order);

module.exports = router;
