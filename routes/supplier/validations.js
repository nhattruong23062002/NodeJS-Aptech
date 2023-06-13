const yup = require("yup");
const ObjectId = require("mongodb").ObjectId;
const phoneRegExp = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g

module.exports = {
  getSupplierSchema: yup.object({
    params: yup.object({
      id: yup.string().test("validationID", "ID sai định dạng", (value) => {
        return ObjectId.isValid(value);
      }),
    }),
  }),

  createSuppliersSchema: yup.object({

    body: yup.object({
      name: yup.string().max(50).required(),
      email: yup.string().email().required(),
      phoneNumber: yup.string()
      .required("required")
      .matches(phoneRegExp, 'SDT không đúng định dạng')
      .min(10, "Nhap du 10 so")
      .max(10, "Nhap du 10 so"),
      address:yup.string()
    }),
  }),
};
