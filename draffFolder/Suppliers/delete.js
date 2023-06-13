const { default: mongoose } = require('mongoose');
const { Suppliers } = require('../models');

/* mongoose.connect('mongodb://localhost:27017/training-database'); */
mongoose.connect('mongodb://127.0.0.1:27017/demo-database');


try {
  const id = '6467763633c72a50ae3c7243';

  Suppliers.findByIdAndDelete(id).then((result) => {
    console.log(result);
  });
} catch (err) {
  console.log(err);
}