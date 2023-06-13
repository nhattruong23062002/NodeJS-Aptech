const yup = require("yup");
const ObjectId = require("mongodb").ObjectId;
const phoneRegExp = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g

module.exports = {
  loginSchema: yup.object({
    body: yup.object({
      email: yup.string()
        .required()
        .test('email type', '${path} Không phải email hợp lệ', (value) => {
          const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;

          return emailRegex.test(value);
        }),

        password: yup.string()
        .required()
        .min(6, 'Mật khẩu phải có tối thiểu 6 kí tự')
        .max(12, 'Mật khẩu không được vượt quá 12 ký tự'),
    }),
  }),

  getEmployeeSchema: yup.object({
    params: yup.object({
      id: yup.string().test("validationID", "ID sai định dạng", (value) => {
        return ObjectId.isValid(value);
      }),
    }),
  }),

  createEmployeesSchema: yup.object({

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
        .required("required")
        .matches(phoneRegExp, 'Phone number is not valid')
        .min(10, "Nhap du 10 so")
        .max(10, "Nhap du 10 so"),
        address:yup.string().required().max(500, "Địa chỉ không được vượt quá 500 ký tự"),
        email: yup.string().email().required(),
        birthday: yup.date().required(),
        password:yup.string().required().min(6, "Password tối thiểu 6 ký tự").max(12, "Password tối đa 12 ký tự"),

    }),
  }),

  editEmployeesSchema: yup.object({

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
        .required("required")
        .matches(phoneRegExp, 'Phone number is not valid')
        .min(10, "Nhap du 10 so")
        .max(10, "Nhap du 10 so"),
        address:yup.string().required().max(500, "Địa chỉ không được vượt quá 500 ký tự"),
        email: yup.string().email().required(),
        birthday: yup.date().required()  
    }),
  }),
};
