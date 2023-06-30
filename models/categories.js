const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const categorySchema = new Schema({
  name: {
    type: String,
    required: [true, "Danh muc khong duoc bo trong"],
    unique: [true, "Tên không được trùng"],
    maxLength: [50, "Ten danh muc khong duoc vuot qua 50 ky tu"],
  },
  description: {
    type: String,
    maxLength: [500, "Ten danh muc khong duoc vuot qua 500 ky tu"],
  },
  img: {
    type: String
  }
});

const Categories = model("Categories", categorySchema);
module.exports = Categories;
