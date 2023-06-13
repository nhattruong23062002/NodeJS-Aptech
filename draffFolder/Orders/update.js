const { default: mongoose } = require('mongoose');
const { Orders } = require('../../models');

/* mongoose.connect('mongodb://localhost:27017/training-database'); */
mongoose.connect('mongodb://127.0.0.1:27017/demo-database');


try {
  const id = '646b13fe3831a59a241a8f5d';
  const data = { 
    createdDate: '03/13/2023',
    shippedDate: '03/16/2023',
    status:'Vui lòng che tên sản phẩm',
    description: 'Hàng dễ vỡ',
    shippingAddress: 'Sài Gòn',
    paymentType:'Bank card',
    customerId:'6469de9774620b87c45441b2',
    employeeId:'6469e0915793fe520f397fc3'
   };
   Orders.findByIdAndUpdate(id, data, {
    new: true,
  }).then((result) => {
    console.log(result);
  });
} catch (err) {
  console.log(err);
}