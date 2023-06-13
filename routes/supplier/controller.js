const { Suppliers } = require("../../models");

module.exports = {
  getSuppliersAll: async (req, res, next) => {
    try {
      let results = await Suppliers.find();
      return res.send({ code: 200, payload: results });
    } catch (err) {
      console.log("««««« err »»»»»", err);
      return res.status(500).json({ code: 500, error: err });
    }
  },

  getSuppliersDetail:  async (req, res, next) => {
    try {
      const { id } = req.params;
  
      let found = await Suppliers.findById(id);
      // let found = await Suppliers.find({ _id: id });
  
      if (found) {
        return res.send({ code: 200, payload: found });
      }
  
      return res.status(410).send({ code: 404, message: "Không tìm thấy" });
    } catch (err) {
      return res.status(500).json({ code: 500, error: err });
    }
  },

  createSuppliers:   async function (req, res, next) {
    try {
      const data = req.body;
  
      const newItem = new Suppliers(data);
  
      let result = await newItem.save();
  
      return res.send({ code: 200, message: "Tạo thành công", payload: result });
    } catch (err) {
      console.log("««««« err »»»»»", err);
      return res.status(500).json({ code: 500, error: err });
    }
  },

  deleteSuppliers: async function (req, res, next) {
  try {
    const { id } = req.params;

    let found = await Suppliers.findByIdAndDelete(id);

    if (found) {
      return res.send({ code: 200, payload: found, message: "Xóa thành công" });
    }

    return res.status(410).send({ code: 404, message: "Không tìm thấy" });
  } catch (err) {
    return res.status(500).json({ code: 500, error: err });
  }
},

  updateSuppliers: async function (req, res, next) {
    try {
      const { id } = req.params;
  
      const updateData = req.body;
  
      const found = await Suppliers.findByIdAndUpdate(id, updateData, {
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
