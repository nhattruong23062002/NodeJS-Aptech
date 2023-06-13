const express = require('express');
const router = express.Router();

const { validateSchema } = require('../../utils');
const {
  getCustomerSchema,
  createCustomersSchema,
} = require('./validations');
const {
  getCustomersAll,
  getCustomersDetail,
  createCustomers,
  updateCustomers,
  deleteCustomers
} = require('./controller');

router.route('/')
  .get(getCustomersAll)
  .post(validateSchema(createCustomersSchema), createCustomers)

router.route('/:id')
  .get(validateSchema(getCustomerSchema), getCustomersDetail)
  .patch(validateSchema(createCustomersSchema), updateCustomers)
  .delete(validateSchema(getCustomerSchema), deleteCustomers)


module.exports = router;