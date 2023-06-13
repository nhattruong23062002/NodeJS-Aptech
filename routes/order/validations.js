const yup = require("yup");
const ObjectId = require("mongodb").ObjectId;

module.exports = {
  getOrderSchema: yup.object({
    params: yup.object({
      id: yup.string().test("validationID", "ID sai định dạng", (value) => {
        return ObjectId.isValid(value);
      }),
    }),
  }),

  createOrderSchema: yup.object({
    body: yup.object({
      createdDate: yup.date(),
      shippedDate: yup
        .date()
        .test('check date', '${path} ngày tháng không hợp lệ', (value) => {
          if (!value) return true;

          if (value && this.createdDate && value < this.createdDate) {
            return false;
          }

         /*  if (value < new Date()) {
            return false;
          }
 */
          return true;
        }),

      status: yup
        .string()
        .required()
        .oneOf(["WAITING", "COMPLETED", "CANCELED"], "Trạng thái không hợp lệ"),
      description: yup.string(),
      shippingAddress: yup.string().required(),
      paymentType: yup
        .string()
        .required()
        .oneOf(["CASH", "CREADIT CARD"], "Phương thức thanh toán không hợp lệ"),
      customerId: yup
        .string()
        .test("Validate ObjectID", "${path} is not valid ObjectID", (value) => {
          if (!value) return true;
          return ObjectId.isValid(value);
        }),
      employeeId: yup
        .string()
        .test("Validate ObjectID", "${path} is not valid ObjectID", (value) => {
          if (!value) return true;
          return ObjectId.isValid(value);
        }),
      orderDetails: yup.array().of(
        yup.object().shape({
          productId: yup
            .string()
            .test("validationProductID", "ID sai định dạng", (value) => {
              return ObjectId.isValid(value);
            }),
  
          quantity: yup.number().required().min(0),
  
          price: yup.number().required().min(0),
  
          discount: yup.number().required().min(0),
        })
      ),
    }),
  }),
};
