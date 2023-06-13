const { default: mongoose } = require('mongoose');
const { Products } = require('../models');

mongoose.connect('mongodb://127.0.0.1:27017/demo-database');

try {
    Products
    .find()
    .populate('categories')
    .populate('suppliers')
    .lean({ virtuals: true })
    .then((result) => {
      console.log(result);
    });
} catch (err) {
  console.log(err);
}