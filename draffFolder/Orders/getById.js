const { default: mongoose } = require('mongoose');
const { Orders } = require('../models');

/* mongoose.connect('mongodb://localhost:27017/training-database'); */
mongoose.connect('mongodb://127.0.0.1:27017/demo-database');

try {
  const id = '646b13a2ab80ec580004c869';
  Orders.findById(id).then((result) => {
    console.log(result);
  });
} catch (err) {
  console.log(err);
}