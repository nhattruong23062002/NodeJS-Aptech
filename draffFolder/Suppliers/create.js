const { default: mongoose } = require('mongoose');
const { Suppliers } = require('../models');

/* mongoose.connect('mongodb://localhost:27017/demo-database'); */
mongoose.connect('mongodb://127.0.0.1:27017/demo-database');


try {
  const data = {
    name: 'Cong ty E',
    email: 'e@gmail.com',
    phoneNumber:'0942563426',
    address :'Hà Nội'
  };

  const newItem = new Suppliers(data);
  console.log('««««« newItem »»»»»', newItem);
  newItem.save().then((result) => {
  console.log('««««« result »»»»»', result);
  });
} catch (err) {
  console.log('««««« err »»»»»', err);
}