const response = require("../../utils/responseData");
const responseMessage = require("../../utils/responseMessage");
const logger = require("../../utils/logger");

const models = require("../../models/index");
const {
  productCheck,
  addCart,
  cartUpdater,
  removeCart,
} = require("./cartService");

//create new cart
async function createCart(req, res) {
  try {
    const { productId, quantity } = req.body;
    console.log("productId", productId);

    const userId = req.decoded.userId;
    const productExists = await productCheck(productId);
    console.log("productCheck", productExists);
    if (!productExists) {
      return response.badRequest(res, responseMessage.product.productNotFound);
    }
    const totalPrice = productExists.price * quantity;
    const stockLeftAfterPurchase = productExists.stockLeft - quantity;
    const params = {
      productId: productId,
      quantity: quantity,
      userId: req.user.id,
      totalPrice: totalPrice,
    };
    const cart = await addCart(params);
    //decrease stock left in product table
    const updatedProduct = await models.Products.update(
      {
        stockLeft: stockLeftAfterPurchase,
      },
      {
        where: {
          id: productId,
        },
      }
    );

    const cartOutput = { cart, stockLeftAfterPurchase, updatedProduct };

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
  try {
    const { productId, quantity } = req.body;
    const userId = req.decoded.userId;
    const totalPrice = productCheck.price * quantity;
    const stockLeftAfterPurchase = productCheck.stockLeft - quantity;
    const params = {
      productId: productId,
      quantity: quantity,
      userId: req.user.id,
      totalPrice: totalPrice,
    };
    const cart = await cartUpdater(params);
    //decrease stock left in product table
    const updatedProduct = await models.Products.update(
      {
        stockLeft: stockLeftAfterPurchase,
      },
      {
        where: {
          id: productId,
        },
      }
    );
    const cartOutput = { cart, stockLeftAfterPurchase, updatedProduct };
    return response.success(res, responseMessage.cart.cartUpdated, cartOutput);
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
    const deletedCart = await removeCart(cartId);
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
