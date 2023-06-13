const { Products,Categories,Suppliers} = require("../../models");

module.exports = {
  getProductAll: async (req, res, next) => {
    try {
      let results = await       
      Products.find().populate('categories').populate('suppliers');
      return res.send({ code: 200, payload: results });
    } catch (err) {
      console.log("««««« err »»»»»", err);
      return res.status(500).json({ code: 500, error: err });
    }
  },

  getProductDetail: async (req, res, next) => {
    try {
      const { id } = req.params;
  
      let found = await Products.findById(id).populate('categories').populate('suppliers');
      // let found = await Products.find({ _id: id });
  
      if (found) {
        return res.send({ code: 200, payload: found });
      }
  
      return res.status(410).send({ code: 404, message: "Không tìm thấy" });
    } catch (err) {
      return res.status(500).json({ code: 500, error: err });
    }
  },

  createProduct:  async function (req, res, next) {
    try {
      const data = req.body;
      const { categoryId, supplierId } = data;

      const findCategory = Categories.findById(categoryId);
      const findSupplier = Suppliers.findById(supplierId);

      const [category, supplier] = await Promise.all([findCategory, findSupplier]);

      const errors = [];
      if (!category || category.isDelete) errors.push('Danh mục không tồn tại');
      if (!supplier || supplier.isDelete) errors.push('Nhà cung cấp không tồn tại');

      if (errors.length > 0) {
        return res.status(404).json({
          code: 404,
          message: "Không tồn tại",
          errors,
        });
      }

      const newItem = new Products(data);
  
      let result = await newItem.save();
  
      return res.send({ code: 200, message: "Tạo thành công", payload: result });
    } catch (err) {
      console.log("««««« err »»»»»", err);
      return res.status(500).json({ code: 500, error: err });
    }
  },

  deleteProduct:async function (req, res, next) {
    try {
      const { id } = req.params;
  
      let found = await Products.findByIdAndDelete(id);
  
      if (found) {
        return res.send({ code: 200, payload: found, message: "Xóa thành công" });
      }
  
      return res.status(410).send({ code: 404, message: "Không tìm thấy" });
    } catch (err) {
      return res.status(500).json({ code: 500, error: err });
    }
  },

  updateProduct: async function (req, res, next) {
    try {
      const { id } = req.params;
  
      const updateData = req.body;
      
      const { categoryId, supplierId } = updateData;

      const findCategory = Categories.findById(categoryId);
      const findSupplier = Suppliers.findById(supplierId);

      const [category, supplier] = await Promise.all([findCategory, findSupplier]);

      const errors = [];
      if (!category || category.isDelete) errors.push('Danh mục không tồn tại');
      if (!supplier || supplier.isDelete) errors.push('Nhà cung cấp không tồn tại');

      if (errors.length > 0) {
        return res.status(404).json({
          code: 404,
          message: "Không tồn tại",
          errors,
        });
      }
  
      const found = await Products.findByIdAndUpdate(id, updateData, {
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
