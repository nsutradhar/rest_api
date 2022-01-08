const mongoose = require("mongoose");
const Order = require("../models/orderModel");
const Product = require("../models/product");

exports.get_req_orders = (req, res, next) => {
  Order.find()
    .select("product quantity _id")
    .populate("product", "name price productImage")
    .exec()
    .then((docs) => {
      res.status(200).json({
        count: docs.length,
        order: docs.map((doc) => {
          return {
            _id: doc._id,
            product: doc.product,
            quantity: doc.quantity,
            request: {
              type: "GET",
              url: "http://localhost:3000/order/" + doc._id,
            },
          };
        }),
      });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

exports.get_single_order = (req, res, next) => {
  Order.findById(req.params.orderId)
    .select("product quantity _id")
    .populate("product", "name price productImage")
    .exec()
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          message: "order not found",
        });
      }
      res.status(200).json({
        order: result,
        request: {
          type: "GET",
          url: "http://localhost:3000/order/",
        },
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "order not found",
      });
    });
};

exports.post_req_order = (req, res, next) => {
  Product.findById(req.body.productId)
    .then((product) => {
      if (!product) {
        return res.status(404).json({
          message: "product not found",
        });
      }
      const order = new Order({
        _id: mongoose.Types.ObjectId(),
        quantity: req.body.quantity,
        product: req.body.productId,
      });
      return order.save();
    })
    .then((result) => {
      res.status(201).json({
        message: "order stored",
        createdOrder: {
          _id: result._id,
          product: result.product,
          quantity: result.quantity,
        },
        request: {
          type: "GET",
          url: "http://localhost:3000/order/" + result._id,
        },
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

exports.delete_order = (req, res, next) => {
  const id = req.params.orderId;
  Order.deleteOne({ _id: id })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "your order has been deleted",
      });
    })
    .catch((err) => {
      res.status(500).json({ message: "something went wrong" });
    });
};
