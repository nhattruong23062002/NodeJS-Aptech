const { default: mongoose } = require('mongoose');
const { Categories } = require('../../models');

/* mongoose.connect('mongodb://localhost:27017/training-database'); */
mongoose.connect('mongodb://127.0.0.1:27017/demo-database');


try {
  const id = '6467649f9d5a3357213dbba9';
  const data = { name: 'New Name',description: 'hang dep qua', };
  Categories.findByIdAndUpdate(id, data, {
    new: true,
  }).then((result) => {
    console.log(result);
  });
} catch (err) {
  console.log(err);
}