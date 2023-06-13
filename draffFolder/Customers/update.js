const { default: mongoose } = require('mongoose');
const { Customers } = require('../../models');

/* mongoose.connect('mongodb://localhost:27017/training-database'); */
mongoose.connect('mongodb://127.0.0.1:27017/demo-database');


try {
  const id = '64678143dd2fa928bfcc6760';
  const data = { 
    firstName: 'Trần',
    lastName: 'Nhan',
    phoneNumber:'0332947249',
    address :'HCM',
    email: 'abc@gmail.com',
    birthday:'124242678834341'
   };
   Customers.findByIdAndUpdate(id, data, {
    new: true,
  }).then((result) => {
    console.log(result);
  });
} catch (err) {
  console.log(err);
}