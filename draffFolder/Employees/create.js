const { default: mongoose } = require('mongoose');
const { Employees } = require('../models');

/* mongoose.connect('mongodb://localhost:27017/demo-database'); */
mongoose.connect('mongodb://127.0.0.1:27017/demo-database');


try {
  const data = {
    firstName: 'Châu',
    lastName: 'Trí',
    phoneNumber:'0352939265',
    address :'Quảng Nam',
    email: 'tri@gmail.com',
    birthday:'04/20/1990'
  };

  const newItem = new Employees(data);
  console.log('««««« newItem »»»»»', newItem);
  newItem.save().then((result) => {
  console.log('««««« result »»»»»', result);
  });
} catch (err) {
  console.log('««««« err »»»»»', err);
}