const { Orders,Employees,Customers,Products} = require("../../models");
const { asyncForEach } = require('../../utils');

module.exports = {
  getOrdersAll: async (req, res, next) => {
    try {
      let results = await Orders.find()
        .populate("customers")
        .populate("employees")
        .populate("orderDetails.products")
        .lean()
      return res.send({ code: 200, payload: results });
    } catch (err) {
      console.log("««««« err »»»»»", err);
      return res.status(500).json({ code: 500, error: err });
    }
  },
  

  getOrderDetail: async (req, res, next) => {
    try {
      const { id } = req.params;
  
      let found = await Orders.findById(id)
        .populate("customers")
        .populate("employees")
        .populate("orderDetails.products")
        .lean()
      // let found = await Orders.find({ _id: id });
  
      if (found) {
        return res.send({ code: 200, payload: found });
      }
  
      return res.status(410).send({ code: 404, message: "Không tìm thấy" });
    } catch (err) {
      return res.status(500).json({ code: 500, error: err });
    }
  },

  createOrder: async function (req, res, next) {
    try {
      const data = req.body;
      const { customerId, employeeId,orderDetails } = data;

      const findCustomer = Customers.findById(customerId);
      const findEmployee = Employees.findById(employeeId);

      const [customer,employee] = await Promise.all([findEmployee, findCustomer]);

      const errors = [];
      if (!customer || customer.isDelete) errors.push('Tên khách hàng không tồn tại');
      if (!employee || employee.isDelete) errors.push('Tên nhân viên không tồn tại');

      await asyncForEach(orderDetails, async (item) => {
        const product = await Products.findById(item.productId);

        if (!product)
          errors.push(`Sản phẩm ${item.productId} không có trong hệ thống`);
      });

      if (errors.length > 0) {
        return res.status(404).json({
          code: 404,
          message: "Không tồn tại",
          errors,
        });
      }
      
      const newItem = new Orders(data);
  
      let result = await newItem.save();
  
      return res.send({ code: 200, message: "Tạo thành công", payload: result });
    } catch (err) {
      console.log("««««« err »»»»»", err);
      return res.status(500).json({ code: 500, error: err });
    }
  },  

  deleteOrder:async function (req, res, next) {
    try {
      const { id } = req.params;
  
      let found = await Orders.findByIdAndDelete(id);
  
      if (found) {
        return res.send({ code: 200, payload: found, message: "Xóa thành công" });
      }
  
      return res.status(410).send({ code: 404, message: "Không tìm thấy" });
    } catch (err) {
      return res.status(500).json({ code: 500, error: err });
    }
  },
  
  updateOrder: async function (req, res, next) {
    try {
      const { id } = req.params;
  
      const updateData = req.body;
      const { customerId, employeeId } = updateData;

      const findCustomer = Customers.findById(customerId);
      const findEmployee = Employees.findById(employeeId);

      const [customer,employee] = await Promise.all([findEmployee, findCustomer]);

      const errors = [];
      if (!customer || customer.isDelete) errors.push('Tên khách hàng không tồn tại');
      if (!employee || employee.isDelete) errors.push('Tên nhân viên không tồn tại');

      await asyncForEach(orderDetails, async (item) => {
        const product = await Products.findById(item.productId);

        if (!product)
          errors.push(`Sản phẩm ${item.productId} không có trong hệ thống`);
      });

      if (errors.length > 0) {
        return res.status(404).json({
          code: 404,
          message: "Không tồn tại",
          errors,
        });
      }
  
      const found = await Orders.findByIdAndUpdate(id, updateData, {
        new: true,
      });
  
      if (found) {
        return res.send({
          code: 200,
          message: "Cập nhật thành công",
          payload: found,
        });
      }
  
      return res.status(410).send({ code: 400, message: "Không tìm thấy" });
    } catch (error) {
      return res.status(500).json({ code: 500, error: err });
    }
  },
};
