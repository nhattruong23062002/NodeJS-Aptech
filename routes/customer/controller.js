const { Customers } = require("../../models");

module.exports = {
  getCustomersAll: async (req, res, next) => {
    try {
      let results = await Customers.find();
      return res.send({ code: 200, payload: results });
    } catch (err) {
      console.log("««««« err »»»»»", err);
      return res.status(500).json({ code: 500, error: err });
    }
  },

  getCustomersDetail:  async (req, res, next) => {
    try {
      const { id } = req.params;
  
      let found = await Customers.findById(id);
      // let found = await Customers.find({ _id: id });
  
      if (found) {
        return res.send({ code: 200, payload: found });
      }
  
      return res.status(410).send({ code: 404, message: "Không tìm thấy" });
    } catch (err) {
      return res.status(500).json({ code: 500, error: err });
    }
  },

  createCustomers:   async function (req, res, next) {
    try {
      const data = req.body;
  
      const newItem = new Customers(data);
  
      let result = await newItem.save();
  
      return res.send({ code: 200, message: "Tạo thành công", payload: result });
    } catch (err) {
      console.log("««««« err »»»»»", err);
      return res.status(500).json({ code: 500, error: err });
    }
  },

  deleteCustomers: async function (req, res, next) {
  try {
    const { id } = req.params;

    let found = await Customers.findByIdAndDelete(id);

    if (found) {
      return res.send({ code: 200, payload: found, message: "Xóa thành công" });
    }

    return res.status(410).send({ code: 404, message: "Không tìm thấy" });
  } catch (err) {
    return res.status(500).json({ code: 500, error: err });
  }
},

  updateCustomers: async function (req, res, next) {
    try {
      const { id } = req.params;
  
      const updateData = req.body;
  
      const found = await Customers.findByIdAndUpdate(id, updateData, {
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
  }
};
