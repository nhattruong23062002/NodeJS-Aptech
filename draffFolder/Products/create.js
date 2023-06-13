const { default: mongoose } = require('mongoose');
const { Products } = require('../models');

/* mongoose.connect('mongodb://localhost:27017/demo-database'); */
mongoose.connect('mongodb://127.0.0.1:27017/demo-database');


try {
  const data = {
    name: 'Tai nghe',
    price: 6000,
    discount: 10,
    stock: 56,
    categoryId: '646765cf82094b27dfae06dc',
    supplierId: '6469dd4f92b29ee2b3a29240',
  };

  const newItem = new Products(data);
  console.log('««««« newItem »»»»»', newItem);
  newItem.save().then((result) => {
  console.log('««««« result »»»»»', result);
  });
} catch (err) {
  console.log('««««« err »»»»»', err);
}