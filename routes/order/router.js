const express = require('express');
const router = express.Router();

const { validateSchema } = require('../../utils');
const {
  getOrderSchema,
  createOrderSchema,
} = require('./validations');
const {
  getOrdersAll,
  getOrderDetail,
  createOrder,
  updateOrder,
  deleteOrder
} = require('./controller');

router.route('/')
  .get(getOrdersAll)
  .post(validateSchema(createOrderSchema), createOrder)

router.route('/:id')
  .get(validateSchema(getOrderSchema), getOrderDetail)
  .patch(validateSchema(createOrderSchema), updateOrder)
  .delete(validateSchema(getOrderSchema),  deleteOrder)


module.exports = router;