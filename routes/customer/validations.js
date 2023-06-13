const yup = require("yup");
const ObjectId = require("mongodb").ObjectId;
const phoneRegExp = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g

module.exports = {
  getCustomerSchema: yup.object({
    params: yup.object({
      id: yup.string().test("validationID", "ID sai định dạng", (value) => {
        return ObjectId.isValid(value);
      }),
    }),
  }),

  createCustomersSchema: yup.object({

    body: yup.object({
      firstName: yup 
        .string()
        .required()
        .max(50, "Họ không được vượt quá 50 ký tự"),

        lastName: yup
        .string()
        .required()
        .max(50, "Tên không được vượt quá 50 ký tự"),

        phoneNumber: yup.string()
        .required()
        .matches(phoneRegExp, 'SDT không đúng định dạng')
        .min(10, "Nhap du 10 so")
        .max(10, "Nhap du 10 so"),
        address:yup.string().required().max(500, "Địa chỉ không được vượt quá 500 ký tự"),
        email: yup.string().email('Email không đúng  định dạng').required(),
        birthday: yup.date().required()  
    }),
  }),
};
