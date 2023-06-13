const express = require('express');
const router = express.Router();

const { validateSchema } = require('../../utils');
const {
  getCategorySchema,
  createCategoriesSchema,
} = require('./validations');
const {
  getCategoriesAll,
  getCategoriesDetail,
  createCategories,
  deleteCategories,
  updateCategories,
} = require('./controller');

router.route('/')
  .get(getCategoriesAll)
  .post(validateSchema(createCategoriesSchema), createCategories)

router.route('/:id')
  .get(validateSchema(getCategorySchema), getCategoriesDetail)
  .patch(validateSchema(createCategoriesSchema), updateCategories)
  .delete(validateSchema(getCategorySchema), deleteCategories)


module.exports = router;