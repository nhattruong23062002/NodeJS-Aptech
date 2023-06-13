const { default: mongoose } = require('mongoose');
const { Orders } = require('../models');

mongoose.connect('mongodb://127.0.0.1:27017/demo-database');

try {
    Orders
    .find()
    .populate('customers')
    .populate('employees')
    .lean({ virtuals: true })
    .then((result) => {
      console.log(result);
    });
} catch (err) {
  console.log(err);
}