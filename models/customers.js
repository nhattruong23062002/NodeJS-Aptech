const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const customersSchema = new Schema({
  firstName: {
    type: String,
    required: [true, 'Họ không được bỏ trống'],
    maxLength: [50, 'Họ không được vượt quá 50 ký tự']
  },
  lastName: {
    type: String,
    required: [true, 'Tên không được bỏ trống'],
    maxLength: [50, 'Tên không được vượt quá 50 ký tự']
  },
  phoneNumber: {
    type: String,
    required: [true, 'Số điện thoại không được bỏ trống'],
    maxLength: [10, 'Số điện thoại không được vượt quá 10 ký tự'],
    minLength: [10, 'Số điện thoại tối thiểu 10 ký tự'],
    validate: {
      validator: function (value) {
        // Kiểm tra tính hợp lệ của số điện thoại
        return /(84|0[3|5|7|8|9])+([0-9]{8})\b/g.test(value);
      },
      message: 'Số điện thoại không hợp lệ'
    }
  },
  address: {
    type: String,
    maxLength: [500, 'Địa chỉ không được vượt quá 500 ký tự']
  },
  email: {
    type: String,
    required: [true, 'Email không được bỏ trống'],
    maxLength: [50, 'Email không được vượt quá 50 ký tự'],
    unique:[true,'Email không được trùng'],
    validate: {
      validator: function (value) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      },
      message: '{value} không hợp lệ'
    }
  },
  birthday:{
    type: Date,
    validate: {
      validator: function (value) {
        return value <= new Date();
      },
      message: 'Ngày sinh nhật không hợp lệ'
    }
  }
  },
  {
    versionKey: false,
    timestamps: true
  });


const Customers = model('Customers', customersSchema);
module.exports = Customers;