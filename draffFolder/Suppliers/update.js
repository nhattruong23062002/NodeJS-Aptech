const { default: mongoose } = require('mongoose');
const { Suppliers } = require('../../models');

/* mongoose.connect('mongodb://localhost:27017/training-database'); */
mongoose.connect('mongodb://127.0.0.1:27017/demo-database');


try {
  const id = '6467733e1a3b0f8dea043340';
  const data = { 
    name:'Cong ty a',
    emai:'aaa@gmail.com',
    phoneNumber: '09855207657',
    address:'HCM'
   };
  Suppliers.findByIdAndUpdate(id, data, {
    new: true,
  }).then((result) => {
    console.log(result);
  });
} catch (err) {
  console.log(err);
}