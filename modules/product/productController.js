const response = require("../../utils/responseData");
const responseMessage = require("../../utils/responseMessage");
const logger = require("../../utils/logger");
const path = require("path");
const { addProduct, removeProduct } = require("./product.service");

const models = require("../../models/index");
const multer = require("multer");

//create product details with product image
const createProduct = async (req, res) => {
  try {
    const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../../uploads")); // path from our current file to storage location
      },
      filename: (req, file, cb) => {
        logger.info("file", file);
        cb(null, Date.now() + "--" + file.originalname);
      },
    });
    var uploadImage = multer({ storage: storage }).single("productImage");
    uploadImage(req, res, async (err) => {
      if (err) {
        logger.error("Error " + err);
        return response.internalServerError(
          res,
          responseMessage.error.errorUploading,
          err
        );
      }

      if (req.file) {
        const {
          productName,
          description,
          price,
          categoryId,
          unitId,
          isAvailable,
          stockLeft,
        } = req.body;
        console.log("body", req.body);

        const params = {
          productName: productName,
          description: description,
          price: price,
          categoryId: categoryId,
          unitId: unitId,
          isAvailable: isAvailable,
          stockLeft: stockLeft,
          productImage: req.file.filename,
        };
        //check if categoryId is valid
        const category = await models.Categories.findOne({
          where: { id: categoryId },
        });
        //check if unitId is valid
        const unit = await models.unit.findOne({
          where: { id: unitId },
        });
        if (category && unit) {
          const product = await addProduct(params);
          return response.success(
            res,
            responseMessage.product.productCreated,
            product
          );
        } else {
          return response.badRequest(
            res,
            responseMessage.category.categoryNotFound
          );
        }
      }
    });
  } catch (err) {
    logger.error("Error " + err);
    return response.internalServerError(
      res,
      responseMessage.product.error,
      err
    );
  }
};
//update product details with product image
async function updateProduct(req, res) {
  try {
    const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../../uploads")); // path from our current file to storage location
      },
      filename: (req, file, cb) => {
        logger.info("file", file);
        cb(null, Date.now() + "--" + file.originalname);
      },
    });
    var uploadImage = multer({ storage: storage }).single("productImage");
    uploadImage(req, res, async (err) => {
      if (err) {
        logger.error("Error " + err);
        return response.internalServerError(
          res,
          responseMessage.error.errorUploading,
          err
        );
      }

      if (req.file) {
        const {
          productName,
          description,
          price,
          categoryId,
          isAvailable,
          stockLeft,
        } = req.body;

        const params = {
          productName: productName,
          description: description,
          price: price,
          categoryId: categoryId,
          isAvailable: isAvailable,
          stockLeft: stockLeft,
          productImage: req.file.filename,
        };
        const product = await addProduct(params);
        return response.success(
          res,
          responseMessage.product.productUpdated,
          product
        );
      }
    });
  } catch (err) {
    logger.error("Error " + err);
    return response.internalServerError(
      res,
      responseMessage.product.errorUpdatingProduct,
      err
    );
  }
}

//delete a product
async function deleteProduct(req, res) {
  try {
    const { productId } = req.params;
    console.log("id", productId);
    const product = await removeProduct(productId);
    return response.success(
      res,
      responseMessage.product.productDeleted,
      product
    );
  } catch (err) {
    logger.error("Error " + err);
    return response.internalServerError(
      res,
      responseMessage.product.errorDeletingProduct,
      err
    );
  }
}

//get all products
async function getAllProducts(req, res) {
  try {
    let { page, size, search, categoryId } = req.query;
    if (!page) {
      page = 1;
    }
    if (!size) {
      size = 5;
    }
    if (!search) {
      search = "";
    }
    if (!categoryId) {
      categoryId = "";
    }
    const limit = parseInt(size);
    const skip = (page - 1) * size;
    const products = await models.Products.findAndCountAll({
      _id: { $ne: id },
    })
      .limit(limit)
      .skip(skip)
      .where("productName", "LIKE", `%${search}%`)
      .where("categoryId", "LIKE", `%${categoryId}%`);
    return response.success(
      res,
      responseMessage.product.productFound,
      products
    );
  } catch (err) {
    logger.error("Error " + err);
    return response.internalServerError(
      res,
      responseMessage.product.error,
      err
    );
  }
}

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
};
