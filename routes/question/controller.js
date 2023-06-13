const { Products, Customers, Orders, Suppliers, Categories } = require("../../models");
const { getQueryDateTime } = require('../../utils');

module.exports = {
  question1: async (req, res, next) => {
    try {
      const conditionFind = {
        discount: { $lte: 10 },
      };

      console.log("««««« conditionFind »»»»»", conditionFind);

      let results = await Products.find(conditionFind);
      let total = await Products.countDocuments();

      return res.send({
        code: 200,
        total,
        totalResult: results.length,
        payload: results,
      });
    } catch (err) {
      return res.status(500).json({ code: 500, error: err });
    }
  },

  question1a: async (req, res, next) => {
    try {
      const { discount, type } = req.query;

      const conditionFind = {};

      if (discount) {
        switch (type) {
          case "eq":
            conditionFind.discount = { $eq: discount };
            break;

          case "lt":
            conditionFind.discount = { $lt: discount };
            break;

          case "lte":
            conditionFind.discount = { $lte: discount };
            break;

          case "gt":
            conditionFind.discount = { $gt: discount };
            break;

          case "gte":
            conditionFind.discount = { $gte: discount };
            break;

          default:
            conditionFind.discount = { $eq: discount };
            break;
        }
      }

      console.log("««««« conditionFind »»»»»", conditionFind);

      let results = await Products.find(conditionFind);
      let total = await Products.countDocuments();

      return res.send({
        code: 200,
        total,
        totalResult: results.length,
        payload: results,
      });
    } catch (err) {
      return res.status(500).json({ code: 500, error: err });
    }
  },

  question1b: async (req, res, next) => {
    try {
      const conditionFind = {
        discount: { $lte: 10 },
      };

      let results = await Products.find(conditionFind)
        .populate("categories")
        .populate("suppliers");
      let total = await Products.countDocuments();

      return res.send({
        code: 200,
        total,
        totalResult: results.length,
        payload: results,
      });
    } catch (err) {
      return res.status(500).json({ code: 500, error: err });
    }
  },

  question2a: async (req, res, next) => {
    try {
      const conditionFind = {
        stock: { $lte: 100 },
      };

      let results = await Products.find(conditionFind);
      let total = await Products.countDocuments();

      return res.send({
        code: 200,
        total,
        totalResult: results.length,
        payload: results,
      });
    } catch (err) {
      return res.status(500).json({ code: 500, error: err });
    }
  },

  question2b: async (req, res, next) => {
    try {
      const conditionFind = {
        stock: { $lte: 100 },
      };

      let results = await Products.find(conditionFind)
        .populate("categories")
        .populate("suppliers");
      let total = await Products.countDocuments();

      return res.send({
        code: 200,
        total,
        totalResult: results.length,
        payload: results,
      });
    } catch (err) {
      return res.status(500).json({ code: 500, error: err });
    }
  },

  question3: async (req, res, next) => {
    try {
      // let discountedPrice = price * (100 - discount) / 100;
      const s = { $subtract: [100, "$discount"] }; // (100 - 10) s => 90

      // discount = 40 ~~~ { discount: { $eq: 40 } }

      const m = { $multiply: ["$price", s] }; // price * 90

      const d = { $divide: [m, 100] }; // price * 90 / 100

      // const { price } = req.query;

      const conditionFind = { $expr: { $lte: [d, parseFloat(10000000)] } };

      let results = await Products.find(conditionFind)
        .select("-categoryId -supplierId")
        .lean(); // convert data to object

      // const newResults = results.map((item) => {
      //   const dis = item.price * (100 - item.discount) / 100;
      //   return {
      //     ...item,
      //     dis,
      //   }
      // }).filter((item) => item.dis >= 40000);

      // console.log('««««« newResults »»»»»', newResults);

      let total = await Products.countDocuments();

      return res.send({
        code: 200,
        total,
        totalResult: results.length,
        payload: results,
      });
    } catch (err) {
      return res.status(500).json({ code: 500, error: err });
    }
  },

  question3a: async (req, res, next) => {
    try {
      const s = { $subtract: [100, '$discount'] }; // (100 - 10) s => 90
      const m = { $multiply: ['$price', s] }; // price * 90
      const d = { $divide: [m, 100] }; // price * 90 / 100

      // let results = await Product.aggregate([
      //   { $addFields: { disPrice: d } },
      //   {
      //     $match: { $expr: { $lte: ['$disPrice', parseFloat(40000)] } },
      //   },
      //   {
      //     $project: {
      //       categoryId: 0,
      //       supplierId: 0,
      //       description: 0,
      //     },
      //   },
      // ]);

      let results = await Products.aggregate()
        .addFields({ disPrice: d })
        .match({ $expr: { $lte: ['$disPrice', parseFloat(40000000)] } })
        .project({
          categoryId: 0,
          supplierId: 0,
          description: 0,
        });

      let total = await Products.countDocuments();

      return res.send({
        code: 200,
        total,
        totalResult: results.length,
        payload: results,
      });
    } catch (err) {
      console.log('««««« err »»»»»', err);
      return res.status(500).json({ code: 500, error: err });
    }
  },

  question4: async (req, res, next) => {
    try {
      const { address } = req.query;
      const conditionFind = {
        address: { $regex: new RegExp(`${address}`), $options: "i" },
      };

      let results = await Customers.find(conditionFind);
      let total = await Customers.countDocuments();

      return res.send({
        code: 200,
        total,
        totalResult: results.length,
        payload: results,
      });
    } catch (err) {
      return res.status(500).json({ code: 500, error: err });
    }
  },

  question4a: async (req, res, next) => {
    try {
      const { name } = req.query;
      const conditionFind = {
        name: { $regex: new RegExp(`${name}`), $options: "i" },
      };

      let results = await Suppliers.find(conditionFind);
      let total = await Suppliers.countDocuments();

      return res.send({
        code: 200,
        total,
        totalResult: results.length,
        payload: results,
      });
    } catch (err) {
      return res.status(500).json({ code: 500, error: err });
    }
  },

  question5: async (req, res, next) => {
    const { year } = req.query;
    try {
      const conditionFind = {
        $expr: {
          $eq: [{ $year: "$birthday" }, year],
        },
      };

      let results = await Customers.find(conditionFind);
      let total = await Customers.countDocuments();

      return res.send({
        code: 200,
        total,
        totalResult: results.length,
        payload: results,
      });
    } catch (err) {
      return res.status(500).json({ code: 500, error: err });
    }
  },

  question6: async (req, res, next) => {
    try {
      const { date } = req.query;
      let today;

      if (!date) {
        today = new Date();
      } else {
        today = new Date(date);
      }

      const conditionFind = {
        $expr: {
          $and: [
            {
              $eq: [{ $dayOfMonth: '$birthday' }, { $dayOfMonth: today }],
            },
            { $eq: [{ $month: '$birthday' }, { $month: today }] },
          ],
        },
      };
      
      let results = await Customers.find(conditionFind);
      let total = await Customers.countDocuments();

      return res.send({
        code: 200,
        total,
        totalResult: results.length,
        payload: results,
      });
    } catch (err) {
      return res.status(500).json({ code: 500, error: err });
    }
  },

  question7: async (req, res, next) => {
    try {
      const { status } = req.query;

      let results = await Orders.find({ status })
        .populate({ path: 'customers', select: 'firstName lastName' })
        .populate('employees')
        .populate({
          path: 'orderDetails.products',
          select: { name: 1, stock: 1 },
        })
        .lean();

      let total = await Orders.countDocuments();

      return res.send({
        code: 200,
        total,
        totalResult: results.length,
        payload: results,
      });
    } catch (err) {
      console.log('««««« err »»»»»', err);
      return res.status(500).json({ code: 500, error: err });
    }
  },

  question7a: async (req, res, next) => {
    try {
      const { status } = req.query;

      let results = await Orders.aggregate()
        .match({ status })
        .lookup({
          from: 'customers',
          localField: 'customerId',
          foreignField: '_id',
          as: 'customer',
        })
        .unwind('customer')
        .lookup({
          from: 'employees',
          localField: 'employeeId',
          foreignField: '_id',
          as: 'employee',
        })
        .unwind('employee')
        .project({
          customerId: 0,
          employeeId: 0,
        });
      // .lookup({
      //   from: 'products',
      //   localField: 'orderDetails.productId',
      //   foreignField: '_id',
      //   as: 'orderDetails.product',
      // })
      // .unwind('product')
      // .populate({ path: 'customer', select: 'firstName lastName' })
      // .populate('employee')
      // .populate({
      //   path: 'orderDetails.product', 
      //   select: { name: 1 , stock: 1},
      // })
      // .select('-customerId -employeeId -orderDetails.productId')
      // .lean();

      let total = await Orders.countDocuments();

      return res.send({
        code: 200,
        total,
        totalResult: results.length,
        payload: results,
      });
    } catch (err) {
      console.log('««««« err »»»»»', err);
      return res.status(500).json({ code: 500, error: err });
    }
  },

  question8a: async (req, res, next) => {
    try {
      let { status, date } = req.query;
      const findDate = date ? new Date(date) : new Date();
      const conditionFind = {
        $expr: {
          $and: [
            {status},
            { $eq: [{ $dayOfMonth: "$shippedDate" },{ $dayOfMonth: findDate }],
            },
            {
              $eq: [{ $month: "$shippedDate" }, { $month: findDate }],
            },
            {
              $eq: [{ $year: "$shippedDate" }, { $year: findDate }],
            },
            {
              $eq: [`$status`, "WAITING"],
            },
          ],
        },
      };

      let results = await Orders.find(conditionFind);
      let total = await Orders.countDocuments();

      return res.send({
        code: 200,
        total,
        totalResult: results.length,
        payload: results,
      });
    } catch (err) {
      return res.status(500).json({ code: 500, error: err });
    }
  },

  question8b: async (req, res, next) => {
    try {
      let { status, fromDate, toDate } = req.query;

      fromDate = new Date(fromDate);
      fromDate.setHours(0, 0, 0, 0);

      const tmpToDate = new Date(toDate);
      tmpToDate.setHours(0, 0, 0, 0);
      toDate = new Date(tmpToDate.setDate(tmpToDate.getDate() + 1));
  
      const compareStatus = { $eq: ['$status', status] };
      const compareFromDate = { $gte: ['$shippedDate', fromDate] };
      const compareToDate = { $lt: ['$shippedDate', toDate] };

      const conditionFind = {
        $expr: { $and: [compareStatus, compareFromDate, compareToDate] },
      };

      let results = await Orders.find(conditionFind)   
      .populate('orderDetails.products')
      .populate('customers')
      .populate('employees')
      .lean();;
      let total = await Orders.countDocuments();

      return res.send({
        code: 200,
        total,
        totalResult: results.length,
        payload: results,
      });
    } catch (err) {
      return res.status(500).json({ code: 500, error: err });
    }
  },

  question9: async (req, res, next) => {
    try {
      const conditionFind = {
        status: "CANCELED",
      };

      let results = await Orders.find(conditionFind);
      let total = await Orders.countDocuments();

      return res.send({
        code: 200,
        total,
        totalResult: results.length,
        payload: results,
      });
    } catch (err) {
      return res.status(500).json({ code: 500, error: err });
    }
  },

  question10: async (req, res, next) => {
    try {
      const conditionFind = {
        $expr: {
          $eq: [{ $dayOfMonth: "$shippedDate" }, { $dayOfMonth: new Date() }],
          $eq: [{ $month: "$shippedDate" }, { $month: new Date() }],
          $eq: [{ $year: "$shippedDate" }, { $year: new Date() }],
        },
        status: "CANCELED",
      };

      let results = await Orders.find(conditionFind);
      let total = await Orders.countDocuments();

      return res.send({
        code: 200,
        total,
        totalResult: results.length,
        payload: results,
      });
    } catch (err) {
      return res.status(500).json({ code: 500, error: err });
    }
  },

  question11: async (req, res, next) => {
    try {
      const conditionFind = {
        paymentType: "CASH",
      };

      let results = await Orders.find(conditionFind);
      let total = await Orders.countDocuments();

      return res.send({
        code: 200,
        total,
        totalResult: results.length,
        payload: results,
      });
    } catch (err) {
      return res.status(500).json({ code: 500, error: err });
    }
  },

  question12: async (req, res, next) => {
    try {
      const conditionFind = {
        paymentType: "CREDIT CARD",
      };

      let results = await Orders.find(conditionFind);
      let total = await Orders.countDocuments();

      return res.send({
        code: 200,
        total,
        totalResult: results.length,
        payload: results,
      });
    } catch (err) {
      return res.status(500).json({ code: 500, error: err });
    }
  },

  question13: async (req, res, next) => {
    try {
      const { shippingAddress } = req.query;
      const conditionFind = {
        shippingAddress: { $regex: new RegExp(`${shippingAddress}`), $options: "i" },
      };

      let results = await Orders.find(conditionFind);
      let total = await Orders.countDocuments();

      return res.send({
        code: 200,
        total,
        totalResult: results.length,
        payload: results,
      });
    } catch (err) {
      return res.status(500).json({ code: 500, error: err });
    }
  },

  question15: async (req, res, next) => {
    try {
      const {supplierNames} = req.query;
      
      const conditionFind = {
          name: {$in : supplierNames}
      };

      let results = await Suppliers.find(conditionFind);
      let total = await Suppliers.countDocuments();

      return res.send({
        code: 200,
        total,
        totalResult: results.length,
        payload: results,
      });
    } catch (err) {
      return res.status(500).json({ code: 500, error: err });
    }
  },

  question18: async (req, res, next) => {
    try {

      let results = await Categories.aggregate()
        .lookup({
          from: 'products',
          localField: '_id',
          foreignField: 'categoryId',
          as: 'products',
        })
        .unwind({
          path:'$products',
          preserveNullAndEmptyArrays:true
        })
        .group({
          _id : '$_id',
          name: {$first : '$name'},
          description:{$first : '$description'},
          totalProduct: {
            $sum : '$products.stock'
          }
        })
        .sort({totalProduct:-1,name:1})
        
      let total = await Categories.countDocuments();

      return res.send({
        code: 200,
        total,
        totalResult: results.length,
        payload: results,
      });
    } catch (err) {
      console.log('««««« err »»»»»', err);
      return res.status(500).json({ code: 500, error: err });
    }
  },

  question19: async (req, res, next) => {
    try {

      let results = await Suppliers.aggregate()
        .lookup({
          from: 'products',
          localField: '_id',
          foreignField: 'supplierId',
          as: 'products',
        })
        .unwind({
          path:'$products',
          preserveNullAndEmptyArrays:true
        })
        .group({
          _id : '$_id',
          name: {$first : '$name'},
          totalProduct: {
            $sum : '$products.stock'
          },
          count:{
            $sum:{ $cond: {if : {$gt :['$products.stock',0]} , then: 1, else: 0}}
          }
        })
        .sort({totalProduct:-1,name:1})
        
        
      let total = await Suppliers.countDocuments();

      return res.send({
        code: 200,
        total,
        totalResult: results.length,
        payload: results,
      });
    } catch (err) {
      console.log('««««« err »»»»»', err);
      return res.status(500).json({ code: 500, error: err });
    }
  },

  question20: async (req, res, next) => {
    try {
      let { status, fromDate, toDate } = req.query;

      fromDate = new Date(fromDate);
      fromDate.setHours(0, 0, 0, 0);

      const tmpToDate = new Date(toDate);
      tmpToDate.setHours(0, 0, 0, 0);
      toDate = new Date(tmpToDate.setDate(tmpToDate.getDate() + 1));
  
      const compareStatus = { $eq: ['$status', status] };
      const compareFromDate = { $gte: ['$shippedDate', fromDate] };
      const compareToDate = { $lt: ['$shippedDate', toDate] };

      const conditionFind = {
        $expr: { $and: [compareStatus, compareFromDate, compareToDate] },
      };

      let results = await Orders.aggregate()
      .match({
        ...conditionFind,
      })
      .unwind('orderDetails')
      .lookup({
        from: 'products',
        localField: 'orderDetails.productId',
        foreignField: '_id',
        as: 'orderDetails.product',
      })
      .unwind('orderDetails.product')
      .group({
        _id: '$orderDetails.productId',
        name: { $first: '$orderDetails.product.name' },
        price: { $first: '$orderDetails.product.price' },
        discount: { $first: '$orderDetails.product.discount' },
        stock: { $first: '$orderDetails.product.stock' },
        count: { $sum: 1 },
      });

      let total = await Orders.countDocuments();

      return res.send({
        code: 200,
        total,
        totalResult: results.length,
        payload: results,
      });
    } catch (err) {
      return res.status(500).json({ code: 500, error: err });
    }
  },

  question21: async (req, res, next) => {
    try {
      let { status, fromDate, toDate } = req.query;

      fromDate = new Date(fromDate);
      fromDate.setHours(0, 0, 0, 0);

      const tmpToDate = new Date(toDate);
      tmpToDate.setHours(0, 0, 0, 0);
      toDate = new Date(tmpToDate.setDate(tmpToDate.getDate() + 1));
  
      const compareStatus = { $eq: ['$status', status] };
      const compareFromDate = { $gte: ['$shippedDate', fromDate] };
      const compareToDate = { $lt: ['$shippedDate', toDate] };

      const conditionFind = {
        $expr: { $and: [compareStatus, compareFromDate, compareToDate] },
      };

      let results = await Orders.aggregate()
      .match({
        ...conditionFind,
      })
      .lookup({
        from: 'customers',
        localField: 'customerId',
        foreignField: '_id',
        as: 'customer',
      })
      .unwind('customer') 
      .group({
        _id: '$customer._id',
        firstName: { $first: '$customer.firstName' },
        lastName: { $first: '$customer.lastName' },

      });

      let total = await Orders.countDocuments();

      return res.send({
        code: 200,
        total,
        totalResult: results.length,
        payload: results,
      });
    } catch (err) {
      return res.status(500).json({ code: 500, error: err });
    }
  },

  question22: async (req, res, next) => {
    try {
      let { fromDate, toDate } = req.query;
      const conditionFind = getQueryDateTime(fromDate, toDate);

      let results = await Orders.aggregate()
        .match(conditionFind)
        .unwind({
          path: '$orderDetails',
          preserveNullAndEmptyArrays: true,
        })
        .addFields({
          total: {
            $sum: {
              $divide: [
                {
                  $multiply: [
                    '$orderDetails.price',
                    { $subtract: [100, '$orderDetails.discount'] },
                    '$orderDetails.quantity',
                  ],
                },
                100,
              ],
            },
          },
        })

      .group({
        _id: '$customerId',
        total: { $sum: '$total' },
      });

      let total = await Orders.countDocuments();

      return res.send({
        code: 200,
        total,
        totalResult: results.length,
        payload: results,
      });
    } catch (err) {
      console.log('««««« err »»»»»', err);
      return res.status(500).json({ code: 500, error: err });
    }
  },

  question23: async (req, res, next) => {
    try {
      let results = await Orders.aggregate()
      .unwind('orderDetails')
      .lookup({
        from: 'products',
        localField: 'orderDetails.productId',
        foreignField: '_id',
        as: 'orderDetails.product',
      })
      .unwind({
        path: '$orderDetails',
        preserveNullAndEmptyArrays: true,
      })
      .addFields({
        total: {
          $sum: {
            $divide: [
              {
                $multiply: [
                  '$orderDetails.price',
                  { $subtract: [100, '$orderDetails.discount'] },
                  '$orderDetails.quantity',
                ],
              },
              100,
            ],
          },
        },
      })
    .group({
      _id: null,
      total: { $sum: '$total' },
    });

      let total = await Orders.countDocuments();

      return res.send({
        code: 200,
        total,
        totalResult: results.length,
        payload: results,
      });
    } catch (err) {
      return res.status(500).json({ code: 500, error: err });
    }
  },

  question24: async (req, res, next) => {
    try {

      let results = await Orders.aggregate()
        .unwind({
          path: '$orderDetails',
          preserveNullAndEmptyArrays: true,
        })
        .addFields({
          total: {
            $sum: {
              $divide: [
                {
                  $multiply: [
                    '$orderDetails.price',
                    { $subtract: [100, '$orderDetails.discount'] },
                    '$orderDetails.quantity',
                  ],
                },
                100,
              ],
            },
          },
        })

      .group({
        _id: '$employeeId',
        total: { $sum: '$total' },
      });

      let total = await Orders.countDocuments();

      return res.send({
        code: 200,
        total,
        totalResult: results.length,
        payload: results,
      });
    } catch (err) {
      console.log('««««« err »»»»»', err);
      return res.status(500).json({ code: 500, error: err });
    }
  },

  question25: async (req, res, next) => {
    try {
      const conditionFind = {
        orders: { $size: 0}
      };
      let results = await Products.aggregate()
      .lookup({
        from: 'orders',
        localField: '_id',
        foreignField: 'orderDetails.productId',
        as: 'orders',
      })
      .match(
        conditionFind,
      )
      .group({
        _id: '$_id',
        name: { $first: '$name' },
        price: { $first: '$price' },
        discount: { $first: '$discount' },
        stock: { $first: '$stock' },
      });

      
      let total = await Products.countDocuments();

      return res.send({
        code: 200,
        total,
        totalResult: results.length,
        payload: results,
      });
    } catch (err) {
      return res.status(500).json({ code: 500, error: err });
    }
  },

  question26: async (req, res, next) => {
    try {
      let {fromDate, toDate } = req.query;

      fromDate = new Date(fromDate);
      fromDate.setHours(0, 0, 0, 0);

      const tmpToDate = new Date(toDate);
      tmpToDate.setHours(0, 0, 0, 0);
      toDate = new Date(tmpToDate.setDate(tmpToDate.getDate() + 1));
  
  
      let results = await Products.aggregate()
        .lookup({
          from: 'orders', 
          localField: '_id',
          foreignField: 'orderDetails.productId',
          as: 'orders',
        })
        .unwind({
          path: '$orders',
          preserveNullAndEmptyArrays: true,
        })

        .group({
          _id: '$supplierId',
          ordersArr: { "$push": "$orders" },
        })
        .unwind({
          path: '$ordersArr',
          preserveNullAndEmptyArrays: true,
        })
        
        .match({
          $or: [
            {
              $and: [
                { ordersArr: { $ne: null } },
                {
                  $or: [
                    { 'ordersArr.createdDate': { $lte: fromDate } },
                    { 'ordersArr.createdDate': { $gte: toDate } },
                  ],
                },
              ],
            },
            {
               ordersArr: null,
            },
          ],
        })
        
        .lookup({
          from: 'suppliers',
          localField: '_id',
          foreignField: '_id',
          as: 'supplier',
        })
        .unwind('supplier')
        .project({
          name: '$supplier.name',
          email: '$supplier.email',
          phoneNumber: '$supplier.phoneNumber',
          address: '$supplier.address',
        })

      let total = await Products.countDocuments();

      return res.send({
        code: 200,
        total,
        totalResult: results.length,
        payload: results,
      });
    } catch (err) {
      console.log('««««« err »»»»»', err);
      return res.status(500).json({ code: 500, error: err });
    }
  },

  question27: async (req, res, next) => {
    try {
      let { fromDate, toDate } = req.query;
      const conditionFind = getQueryDateTime(fromDate, toDate);

      let results = await Orders.aggregate()
        .match(conditionFind)
        .unwind({
          path: '$orderDetails',
          preserveNullAndEmptyArrays: true,
        })
        .addFields({
          total: {
            $sum: {
              $divide: [
                {
                  $multiply: [
                    '$orderDetails.price',
                    { $subtract: [100, '$orderDetails.discount'] },
                    '$orderDetails.quantity',
                  ],
                },
                100,
              ],
            },
          },
        })

      .group({
        _id: '$employeeId',
        total: { $sum: '$total' },
      })
      .lookup({
        from: 'employees',
        localField: '_id',
        foreignField: '_id',
        as: 'employees',
      })
      .unwind('employees')
      .project({
        firstName: '$employees.firstName',
        lastName: '$employees.lastName',
        phoneNumber: '$employees.phoneNumber',
        address: '$employees.address',
        email: '$employees.email',
        totalSales: 1,
      })
      .sort({ total: -1 }).skip(0).limit(2);

      let total = await Orders.countDocuments();

      return res.send({
        code: 200,
        total,
        totalResult: results.length,
        payload: results,
      });
    } catch (err) {
      console.log('««««« err »»»»»', err);
      return res.status(500).json({ code: 500, error: err });
    }
  },

  question28: async (req, res, next) => {
    try {
      let { fromDate, toDate } = req.query;
      const conditionFind = getQueryDateTime(fromDate, toDate);

      let results = await Orders.aggregate()
        .match(conditionFind)
        .unwind({
          path: '$orderDetails',
          preserveNullAndEmptyArrays: true,
        })
        .addFields({
          total: {
            $sum: {
              $divide: [
                {
                  $multiply: [
                    '$orderDetails.price',
                    { $subtract: [100, '$orderDetails.discount'] },
                    '$orderDetails.quantity',
                  ],
                },
                100,
              ],
            },
          },
        })

      .group({
        _id: '$customerId',
        total: { $sum: '$total' },
      })
      .sort({ total: -1 }).skip(0).limit(2);

      let total = await Orders.countDocuments();

      return res.send({
        code: 200,
        total,
        totalResult: results.length,
        payload: results,
      });
    } catch (err) {
      console.log('««««« err »»»»»', err);
      return res.status(500).json({ code: 500, error: err });
    }
  },

  question29: async (req, res, next) => {
    try {
      let results = await Products.distinct('discount')

      let total = await Products.countDocuments();

      return res.send({
        code: 200,
        total,
        totalResult: results.length,
        payload: results,
      });
    } catch (err) {
      return res.status(500).json({ code: 500, error: err });
    }
  },

  question30: async (req, res, next) => {
    try {

      let results = await Categories.aggregate([
        {
          $lookup: {
            from: "products",
            localField: "_id",
            foreignField: "categoryId",
            as: "product"
          }
        },
        {
          $unwind: {
            path : '$product',
            preserveNullAndEmptyArrays:true
          }
        },
        {
          $lookup : ({
            from: 'orders',
            localField: 'product._id',
            foreignField: 'orderDetails.productId',
            as: 'orders',
          })
        },
        {
          $unwind:{ 
            path : '$orders',
            preserveNullAndEmptyArrays:true
          }
        },
        {
          $unwind:{ 
            path : '$orders.orderDetails',
            preserveNullAndEmptyArrays:true
          }
        },
        
        { $addFields : ({
          total: {
            $sum: {
              $divide: [
                {
                  $multiply: [
                    '$orders.orderDetails.price',
                    { $subtract: [100, '$orders.orderDetails.discount'] },
                    '$orders.orderDetails.quantity',
                  ],
                },
                100,
              ],
            },
          },
        })}, 
        {
          $group: {
            _id : "$_id",
            name: { $first: '$name'},
            total: { $sum: '$total' },
          }
        } 
      ])
        
      let total = await Categories.countDocuments();

      return res.send({
        code: 200,
        total,
        totalResult: results.length,
        payload: results,
      });
    } catch (err) {
      console.log('««««« err »»»»»', err);
      return res.status(500).json({ code: 500, error: err });
    }
  },

  question31: async (req, res, next) => {
    try {
      let {status, fromDate, toDate } = req.query;
      const conditionFind = getQueryDateTime(fromDate, toDate);
      let results = await Orders.aggregate()
      .match({
        ...conditionFind,
        status
      })
      .unwind('orderDetails')
      .lookup({
        from: 'products',
        localField: 'orderDetails.productId',
        foreignField: '_id',
        as: 'orderDetails.product',
      })
      .unwind({
        path: '$orderDetails',
        preserveNullAndEmptyArrays: true,
      })
      .addFields({
        total: {
          $sum: {
            $divide: [
              {
                $multiply: [
                  '$orderDetails.price',
                  { $subtract: [100, '$orderDetails.discount'] },
                  '$orderDetails.quantity',
                ],
              },
              100,
            ],
          },
        },
      })
    .group({
      _id: '$_id',
      total: { $sum: '$total' },
    });

      let total = await Orders.countDocuments();

      return res.send({
        code: 200,
        total,
        totalResult: results.length,
        payload: results,
      });
    } catch (err) {
      return res.status(500).json({ code: 500, error: err });
    }
  },

  question32: async (req, res, next) => {
    try {
      let {fromDate, toDate } = req.query;
      const conditionFind = getQueryDateTime(fromDate, toDate);
      let results = await Orders.aggregate()
      .match({
        ...conditionFind,
      })
      .unwind('orderDetails')
      .lookup({
        from: 'products',
        localField: 'orderDetails.productId',
        foreignField: '_id',
        as: 'orderDetails.product',
      })
      .unwind({
        path: '$orderDetails',
        preserveNullAndEmptyArrays: true,
      })
      .addFields({
        total: {
          $sum: {
            $divide: [
              {
                $multiply: [
                  '$orderDetails.price',
                  { $subtract: [100, '$orderDetails.discount'] },
                  '$orderDetails.quantity',
                ],
              },
              100,
            ],
          },
        },
      })
    .group({
      _id: '$_id',
      total: { $sum: '$total' },
    })
    .sort({ total: -1 });

      let total = await Orders.countDocuments();

      return res.send({
        code: 200,
        total,
        totalResult: results.length,
        payload: results,
      });
    } catch (err) {
      return res.status(500).json({ code: 500, error: err });
    }
  },

  question33: async (req, res, next) => {
    try {
      let {fromDate, toDate } = req.query;
      const conditionFind = getQueryDateTime(fromDate, toDate);
      let results = await Orders.aggregate()
      .match({
        ...conditionFind,
      })
      .unwind('orderDetails')
      .lookup({
        from: 'products',
        localField: 'orderDetails.productId',
        foreignField: '_id',
        as: 'orderDetails.product',
      })
      .unwind({
        path: '$orderDetails',
        preserveNullAndEmptyArrays: true,
      })
      .addFields({
        total: {
          $sum: {
            $divide: [
              {
                $multiply: [
                  '$orderDetails.price',
                  { $subtract: [100, '$orderDetails.discount'] },
                  '$orderDetails.quantity',
                ],
              },
              100,
            ],
          },
        },
      })
    .group({
      _id: '$_id',
      total: { $sum: '$total' },
    })
    
    .sort({ total: 1 }).skip(0).limit(1);

      let total = await Orders.countDocuments();

      return res.send({
        code: 200,
        total,
        totalResult: results.length,
        payload: results,
      });
    } catch (err) {
      return res.status(500).json({ code: 500, error: err });
    }
  },

  question34: async (req, res, next) => {
    try {
      let {fromDate, toDate } = req.query;
      const conditionFind = getQueryDateTime(fromDate, toDate);
      let results = await Orders.aggregate()
      .match({
        ...conditionFind,
      })
      .unwind('orderDetails')
      .lookup({
        from: 'products',
        localField: 'orderDetails.productId',
        foreignField: '_id',
        as: 'orderDetails.product',
      })
      .unwind({
        path: '$orderDetails',
        preserveNullAndEmptyArrays: true,
      })
      .addFields({
        total: {
          $sum: {
            $divide: [
              {
                $multiply: [
                  '$orderDetails.price',
                  { $subtract: [100, '$orderDetails.discount'] },
                  '$orderDetails.quantity',
                ],
              },
              100,
            ],
          },
        },
      })
    .group({
      _id:null,
      average: { $avg: "$total" }
    })
    .project({
      _id: 0,
      average:1
    })

      let total = await Orders.countDocuments();

      return res.send({
        code: 200,
        total,
        totalResult: results.length,
        payload: results,
      });
    } catch (err) {
      return res.status(500).json({ code: 500, error: err });
    }
  },

};
