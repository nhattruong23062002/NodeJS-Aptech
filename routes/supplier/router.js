const express = require('express');
const router = express.Router();

const { validateSchema } = require('../../utils');
const {
  getSupplierSchema,
  createSuppliersSchema,
} = require('./validations');
const {
  getSuppliersAll,
  getSuppliersDetail,
  createSuppliers,
  updateSuppliers,
  deleteSuppliers
} = require('./controller');

router.route('/')
  .get(getSuppliersAll)
  .post(validateSchema(createSuppliersSchema), createSuppliers)

router.route('/:id')
  .get(validateSchema(getSupplierSchema), getSuppliersDetail)
  .patch(validateSchema(createSuppliersSchema), updateSuppliers)
  .delete(validateSchema(getSupplierSchema), deleteSuppliers)


module.exports = router;