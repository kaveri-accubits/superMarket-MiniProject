const response = require("../../utils/responseData");
const responseMessage = require("../../utils/responseMessage");
const logger = require("../../utils/logger");
const path = require("path");
const models = require("../../models/index");
const {
  addOrder,
  removeOrder,
  updateOrder,
  getAllOrders,
} = require("./orderService");

//create order details
async function createOrderDetails(req, res) {
  const { totalQuantity, totalPrice, paymentStatus } = req.body;
  const params = {
    totalQuantity,
    totalPrice,
    paymentStatus,
  };
  try {
    const orderData = await addOrder(params);
    return response.success(res, responseMessage.order.orderCreated, orderData);
  } catch (err) {
    return response.internalServerError(
      res,
      responseMessage.order.errorCreatingOrder,
      err
    );
  }
}

//update order details
async function updateOrderDetails(req, res) {
  const { orderId } = req.params;
  const { totalQuantity, totalPrice, paymentStatus } = req.body;
  const params = {
    totalQuantity,
    totalPrice,
    paymentStatus,
  };
  try {
    const orderData = await updateOrder(params, orderId);
    return response.success(res, responseMessage.order.orderUpdated, orderData);
  } catch (err) {
    return response.internalServerError(
      res,
      responseMessage.order.errorUpdatingOrder,
      err
    );
  }
}

//delete order details
async function deleteOrderDetails(req, res) {
  const { orderId } = req.params;
  try {
    const orderData = await removeOrder(orderId);
    return response.success(res, responseMessage.order.orderDeleted, orderData);
  } catch (err) {
    return response.internalServerError(
      res,
      responseMessage.order.errorDeletingOrder,
      err
    );
  }
}

//get all orders
async function getAllOrdersDetails(req, res) {
  try {
    const orderData = await getAllOrders();
    return response.success(res, responseMessage.order.orderFound, orderData);
  } catch (err) {
    return response.internalServerError(
      res,
      responseMessage.order.errorGettingOrder,
      err
    );
  }
}

module.exports = {
  createOrderDetails,
  updateOrderDetails,
  deleteOrderDetails,
  getAllOrdersDetails,
};
