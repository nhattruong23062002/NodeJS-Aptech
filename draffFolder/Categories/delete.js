const { default: mongoose } = require('mongoose');
const { Categories } = require('../models');

/* mongoose.connect('mongodb://localhost:27017/training-database'); */
mongoose.connect('mongodb://127.0.0.1:27017/demo-database');


try {
  const id = '6467685fb32e48cb76e8335e';

  Categories.findByIdAndDelete(id).then((result) => {
    console.log(result);
  });
} catch (err) {
  console.log(err);
}