const { default: mongoose } = require('mongoose');
const { Orders } = require('../models');

/* mongoose.connect('mongodb://localhost:27017/demo-database'); */
mongoose.connect('mongodb://127.0.0.1:27017/demo-database');


try {
  const data = {
    createdDate: '05/12/2023',
    shippedDate: '05/14/2023',
    status:'Vui lòng che tên sản phẩm',
    description: 'Hàng dễ vỡ',
    shippingAddress: 'Hà Nội',
    paymentType:'direct',
    customerId:'6469de9774620b87c45441b2',
    employeeId:'6469e0915793fe520f397fc3'
  };

  const newItem = new Orders(data);
  console.log('««««« newItem »»»»»', newItem);
  newItem.save().then((result) => {
  console.log('««««« result »»»»»', result);
  });
} catch (err) {
  console.log('««««« err »»»»»', err);
}