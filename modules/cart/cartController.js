const response = require("../../utils/responseData");
const responseMessage = require("../../utils/responseMessage");
const logger = require("../../utils/logger");

const models = require("../../models/index");
const { productCheck } = require("./cartService");

//create new cart
async function createCart(req, res) {
  try {
    const { productId, quantity } = req.body;
    const userId = req.decoded.userId;
    console.log("productCheck", productCheck);
    if (!productCheck) {
      return response.badRequest(res, responseMessage.product.productNotFound);
    }
    const totalPrice = productCheck.price * quantity;
    const stockLeftAfterPurchase = productCheck.stockLeft - quantity;

    const cart = await models.Cart.create({
      userId: userId,
      productId: productId,
      quantity: quantity,
      totalPrice: totalPrice,
    });
    const cartOutput = { cart, stockLeftAfterPurchase };
    return response.success(res, responseMessage.cart.cartCreated, cartOutput);
  } catch (error) {
    return response.internalServerError(
      res,
      responseMessage.error.errorCreatingCart,
      error
    );
  }
}

//update cart
async function updateCart(req, res) {
  const { cartId } = req.params;
  const { quantity, totalPrice, paymentMethod } = req.body;
  try {
    const cart = await models.Cart.findOne({
      where: {
        cartId: cartId,
      },
    });
    if (!cart) {
      return response.notFound(res, responseMessage.cart.cartNotFound);
    }
    const updatedCart = await models.Cart.update(
      {
        quantity: quantity,
        totalPrice: totalPrice,
        paymentMethod: paymentMethod,
      },
      {
        where: {
          cartId: cartId,
        },
      }
    );
    return response.success(res, responseMessage.cart.cartUpdated, updatedCart);
  } catch (error) {
    return response.internalServerError(
      res,
      responseMessage.cart.errorUpdatingCart,
      error
    );
  }
}

//delete cart
async function deleteCart(req, res) {
  const { cartId } = req.params;
  try {
    const cart = await models.Cart.findOne({
      where: {
        cartId: cartId,
      },
    });
    if (!cart) {
      return response.notFound(res, responseMessage.cart.cartNotFound);
    }
    const deletedCart = await models.Cart.destroy({
      where: {
        cartId: cartId,
      },
    });
    return response.success(res, responseMessage.cart.cartDeleted, deletedCart);
  } catch (error) {
    return response.internalServerError(
      res,
      responseMessage.cart.errorDeleteCart,
      error
    );
  }
}

//view cart
async function viewCart(req, res) {
  const { userId } = req.params;
  try {
    const cart = await models.Cart.findAll({
      where: {
        userId: userId,
      },
    });
    if (!cart) {
      return response.notFound(res, responseMessage.cart.cartNotFound);
    }
    return response.success(res, responseMessage.cart.cartFound, cart);
  } catch (error) {
    return response.internalServerError(
      res,
      responseMessage.cart.errorViewCart,
      error
    );
  }
}

module.exports = {
  createCart,
  updateCart,
  deleteCart,
  viewCart,
};
