const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const bcrypt = require("bcryptjs");

const employeesSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "Họ không được bỏ trống"],
      maxLength: [50, "Họ không được vượt quá 50 ký tự"],
    },
    lastName: {
      type: String,
      required: [true, "Tên không được bỏ trống"],
      maxLength: [50, "Tên không được vượt quá 50 ký tự"],
    },
    phoneNumber: {
      type: String,
      required: [true, "Số điện thoại không được bỏ trống"],
      maxLength: [10, "Số điện thoại không được vượt quá 10 ký tự"],
      minLength: [10, "Số điện thoại tối thiểu 10 ký tự"],
      validate: {
        validator: function (value) {
          // Kiểm tra tính hợp lệ của số điện thoại
          return /(84|0[3|5|7|8|9])+([0-9]{8})\b/g.test(value);
        },
        message: "Số điện thoại không hợp lệ",
      },
    },
    address: {
      type: String,
      maxLength: [500, "Địa chỉ không được vượt quá 500 ký tự"],
    },
    email: {
      type: String,
      required: [true, "Email không được bỏ trống"],
      maxLength: [50, "Email không được vượt quá 50 ký tự"],
      unique: [true, "Email không được trùng"],
      validate: {
        validator: function (value) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        },
        message: "{value} không hợp lệ",
      },
    },
    birthday: {
      type: Date,
      validate: {
        validator: function (value) {
          return value <= new Date();
        },
        message: "Ngày sinh nhật không hợp lệ",
      },
    },
    password: {
      type: String,
      minLength: [6, "Password phải tối thiểu 6 ký tự"],
      maxLength: [12, "Password tối đa 12 ký tự"],
      required: [true, "password không được bỏ trống"],
    },
    isActive: {
      type: Boolean,
      default: true,
      required: true,
    },
    roles: {
      type: Array,
      default:[],
    }
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

employeesSchema.pre("save", async function (next) {
  try {
    // generate salt key
    const salt = await bcrypt.genSalt(10); // 10 ký tự
    // generate password = salt key + hash key
    const hashPass = await bcrypt.hash(this.password, salt);
    // override password
    this.password = hashPass;
    next();
  } catch (err) {
    next(err);
  }
});

employeesSchema.methods.isValidPass = async function(pass) {
  try {
    return await bcrypt.compare(pass, this.password);
  } catch (err) {
    throw new Error(err);
  }
};

const Employees = model("Employees", employeesSchema);
module.exports = Employees;
