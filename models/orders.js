const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const mongooseLeanVirtuals = require("mongoose-lean-virtuals");

// Mongoose Datatypes:
// https://mongoosejs.com/docs/schematypes.html

// Validator
// https://mongoosejs.com/docs/validation.html#built-in-validators

const orderDetailSchema = new Schema(
  {
    productId: { type: Schema.Types.ObjectId, ref: "Products", required: true },
    quantity: {
      type: Number,
      required: [true, "Số lượng không được để trống"],
      min: 0,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, "Giá không được để trống"],
      min: 0,
      default: 0,
    },
    discount: { type: Number, min: 0, max: 75, default: 0 },
  },
  {
    versionKey: false,
  }
);

// Virtual with Populate
orderDetailSchema.virtual("products", {
  ref: "Products",
  localField: "productId",
  foreignField: "_id",
  justOne: true,
});

orderDetailSchema.set("toObject", { virtuals: true });
orderDetailSchema.set("toJSON", { virtuals: true });

/*-----------------------------------*/

const orderSchema = Schema(
  {
    createdDate: {
      type: Date,
      require: [true, "Vui lòng nhập trường này"],
      default: Date.now,
    },
    shippedDate: {
      type: Date,
      require: [true, "Vui lòng nhập trường này"],
      validate: {
        validator: function (value) {
          if (!value) return true;

          if (value < this.createdDate) {
            return false;
          }

          return true;
        },
        message: `Shipped date: {VALUE} is invalid!`,
      },
    },
    status: {
      type: String,
      required: true,
      default: "WAITING",
      enum: ["WAITING", "COMPLETED", "CANCELED"],
    },
    description: {
      type: String,
    },
    shippingAddress: {
      type: String,
      require: [true, "Vui lòng nhập địa chỉ"],
      maxLength: [500, "Địa chỉ không được vượt quá 500 ký tự"],
    },
    paymentType: {
      type: String,
      require: [true, "Vui lòng nhập phương thức thanh toán"],
      default: "CASH",
      enum: ["CASH", "CREDIT CARD"],
    },
    customerId: {
      type: Schema.Types.ObjectId,
      ref: "Customers",
      required: true,
    },
    // Reference to Supplier
    employeeId: {
      type: Schema.Types.ObjectId,
      ref: "Employees",
      required: true,
    },
    orderDetails: [orderDetailSchema],
  },
  {
    versionKey: false,
    timeStamp: true,
  }
);

/* orderSchema.virtual('discountedPrice').get(function () {
    return (this.price * (100 - this.discount)) / 100;
  }); */

// Virtual with Populate
orderSchema.virtual("customers", {
  ref: "Customers",
  localField: "customerId",
  foreignField: "_id",
  justOne: true,
});

orderSchema.virtual("employees", {
  ref: "Employees",
  localField: "employeeId",
  foreignField: "_id",
  justOne: true,
});

// Config
orderSchema.set("toJSON", { virtuals: true });
orderSchema.set("toObject", { virtuals: true });
//
orderSchema.plugin(mongooseLeanVirtuals);

const Orders = model("Order", orderSchema);
module.exports = Orders;
