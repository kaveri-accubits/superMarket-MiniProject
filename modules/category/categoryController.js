const response = require("../../utils/responseData");
const responseMessage = require("../../utils/responseMessage");
const logger = require("../../utils/logger");
const path = require("path");
const models = require("../../models/index");
const { addCategory, removeCategory } = require("./categoryService");

//create category details
async function createCategory(req, res) {
  try {
    const { category } = req.body;
    const params = {
      category: category,
    };
    const categoryData = await addCategory(params);
    return response.success(
      res,
      responseMessage.category.categoryCreated,
      categoryData
    );
  } catch (err) {
    return response.internalServerError(
      res,
      responseMessage.category.errorCreatingCategory,
      err
    );
  }
}

//update category details
async function updateCategory(req, res) {
  try {
    const { categoryId } = req.params;
    const { category } = req.body;
    const params = {
      category: category,
    };
    const data = await models.Categories.update(params, {
      where: {
        categoryId: categoryId,
      },
    });
    return response.success(
      res,
      responseMessage.category.categoryUpdated,
      data
    );
  } catch (err) {
    return response.internalServerError(
      res,
      responseMessage.category.errorUpdatingCategory,
      err
    );
  }
}

//delete category details
async function deleteCategory(req, res) {
  try {
    const { categoryId } = req.params;
    const data = await removeCategory(categoryId);
    return response.success(
      res,
      responseMessage.category.categoryDeleted,
      data
    );
  } catch (err) {
    return response.internalServerError(
      res,
      responseMessage.category.errorDeletingCategory,
      err
    );
  }
}

//get all category details
async function getAllCategory(req, res) {
  try {
    const data = await models.Categories.findAll();
    return response.success(res, responseMessage.category.categoryFound, data);
  } catch (err) {
    return response.internalServerError(
      res,
      responseMessage.category.categoryNotFound,
      err
    );
  }
}

module.exports = {
  createCategory,
  updateCategory,
  deleteCategory,
  getAllCategory,
};
