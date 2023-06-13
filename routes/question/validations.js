const yup = require('yup');
const ObjectId = require('mongodb').ObjectId;

module.exports = {
  q1: yup.object({
    query: yup.object({
      discount: yup.number().min(0).max(100),
      type: yup.string().oneOf(['eq','lt','lte','gt','gte']),
    }),
  }),

  getProductSchema: yup.object({
    params: yup.object({
      id: yup.string().test('validationID', 'ID sai định dạng', (value) => {
        return ObjectId.isValid(value);
      }),
    }),
  }),
};