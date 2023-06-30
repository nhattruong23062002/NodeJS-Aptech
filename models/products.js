const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const mongooseLeanVirtuals = require("mongoose-lean-virtuals");

// Mongoose Datatypes:
// https://mongoosejs.com/docs/schematypes.html

// Validator
// https://mongoosejs.com/docs/validation.html#built-in-validators

const productSchema = Schema(
  {
    name: {
      type: String,
      required: true,
      maxLength: [50, "Tên sản phẩm không được vượt quá 50 ký tự"],
    },
    price: {
      type: Number,
      required: [true, "Giá không được để trống"],
      min: 0,
      default: 0,
    },
    discount: { type: Number, min: 0, max: 75, default: 0 },
    stock: { type: Number, min: 0, default: 0 },
    description: {
      type: String,
      maxLength: [500, "Tên sản phẩm không được vượt quá 500 ký tự"],
    },
    // Reference to Category
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "Categories",
      required: true,
    },
    // Reference to Supplier
    supplierId: {
      type: Schema.Types.ObjectId,
      ref: "Suppliers",
      required: true,
    },
    cover: { type: String },
  },
  {
    versionKey: false,
    timeStamp: true,
  }
);

productSchema.virtual("discountedPrice").get(function () {
  return (this.price * (100 - this.discount)) / 100;
});

// Virtual with Populate
productSchema.virtual("categories", {
  ref: "Categories",
  localField: "categoryId",
  foreignField: "_id",
  justOne: true,
});

productSchema.virtual("suppliers", {
  ref: "Suppliers",
  localField: "supplierId",
  foreignField: "_id",
  justOne: true,
});

// Config
productSchema.set("toJSON", { virtuals: true });
productSchema.set("toObject", { virtuals: true });
//
productSchema.plugin(mongooseLeanVirtuals);

const Products = model("Products", productSchema);
module.exports = Products;
