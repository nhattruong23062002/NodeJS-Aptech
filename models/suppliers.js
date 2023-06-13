const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const suppliersSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Tên không được bỏ trống'],
    unique: [true, 'Tên đã bị trùng'],
    maxLength: [100, 'Tên không được vượt quá 100 ký tự']
  },
  email: {
    type: String,
    required: [true, 'Email không được bỏ trống'],
    maxLength: [50, 'Email không được vượt quá 50 ký tự'],
    unique:[true,'Email không được trùng'],
    validate: {
      validator: function (value) {
        // Kiểm tra tính hợp lệ của địa chỉ email
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      },
      message: 'Email không hợp lệ'
    }
  },
  phoneNumber: {
    type: String,
    required: [true, 'Số điện thoại không được bỏ trống'],
    maxLength: [10, 'Số điện thoại không được vượt quá 10 ký tự'],
    minLength: [10, 'Số điện thoại tối thiểu 10 ký tự'],
    unique:[true,'SDT không được trùng'],
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
  }
  },
  {
  versionKey:false,
  timestamps:true,
  },
);


const Suppliers = model('Suppliers', suppliersSchema);
module.exports = Suppliers;