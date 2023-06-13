const { default: mongoose } = require('mongoose');
const { Products } = require('../../models');

/* mongoose.connect('mongodb://localhost:27017/training-database'); */
mongoose.connect('mongodb://127.0.0.1:27017/demo-database');


try {
  const id = '646a31260ef349a9dd792fba';
  const data = { 
    name: 'Laptop',
    price: 65000,
    discount: 15,
    stock: 23,
    categoryId: '646765cf82094b27dfae06dc',
    supplierId: '6469dd4f92b29ee2b3a29240',
   };
   Products.findByIdAndUpdate(id, data, {
    new: true,
  }).then((result) => {
    console.log(result);
  });
} catch (err) {
  console.log(err);
}