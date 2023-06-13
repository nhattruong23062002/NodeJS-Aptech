const { default: mongoose } = require('mongoose');
const { Customers } = require('../models');

/* mongoose.connect('mongodb://localhost:27017/demo-database'); */
mongoose.connect('mongodb://127.0.0.1:27017/demo-database');


try {
  const data = {
    firstName: 'Hứa',
    lastName: 'Bảo',
    phoneNumber:'0332947299',
    address :'Huế',
    email: 'nam@gmail.com',
    birthday:'357223980'
  };

  const newItem = new Customers(data);
  console.log('««««« newItem »»»»»', newItem);
  newItem.save().then((result) => {
  console.log('««««« result »»»»»', result);
  });
} catch (err) {
  console.log('««««« err »»»»»', err);
}