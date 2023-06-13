const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const mongooseLeanVirtuals = require('mongoose-lean-virtuals');

// Mongoose Datatypes:
// https://mongoosejs.com/docs/schematypes.html

// Validator
// https://mongoosejs.com/docs/validation.html#built-in-validators

const mediaSchema = new Schema(
  {
    name: { type: String, required: true },
    location: { type: String, required: true },
    employeeId: {
        type: Schema.Types.ObjectId,
        ref: "Employees",
        required: true,
      },
  },
  {
    versionKey: false,
    timestamps: true, // createdAt updatedAt
  },
);


mediaSchema.virtual("employees", {
    ref: "Employees",
    localField: "employeeId",
    foreignField: "_id",
    justOne: true,
  });
  

// Config
mediaSchema.set('toJSON', { virtuals: true });
mediaSchema.set('toObject', { virtuals: true });
//
mediaSchema.plugin(mongooseLeanVirtuals);

const Media = model('Media', mediaSchema);
module.exports = Media;