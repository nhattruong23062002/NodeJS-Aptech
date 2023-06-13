const { default: mongoose } = require('mongoose');
const { Employees } = require('../models');

/* mongoose.connect('mongodb://localhost:27017/training-database'); */
mongoose.connect('mongodb://127.0.0.1:27017/demo-database');


try {
    Employees.find().then((result) => {
    console.log(result);
  });
} catch (err) {
  console.log(err);
}