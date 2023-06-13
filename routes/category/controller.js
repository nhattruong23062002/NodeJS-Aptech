const { Categories } = require("../../models");

module.exports = {
  getCategoriesAll: async (req, res, next) => {
    try {
      let results = await Categories.find();
      return res.send({ code: 200, payload: results });
    } catch (err) {
      console.log("««««« err »»»»»", err);
      return res.status(500).json({ code: 500, error: err });
    }
  },

  getCategoriesDetail:  async (req, res, next) => {
    try {
      const { id } = req.params;
  
      let found = await Categories.findById(id);
      // let found = await Categories.find({ _id: id });
  
      if (found) {
        return res.send({ code: 200, payload: found });
      }
  
      return res.status(410).send({ code: 404, message: "Không tìm thấy" });
    } catch (err) {
      return res.status(500).json({ code: 500, error: err });
    }
  },

  createCategories:   async function (req, res, next) {
    try {
      const data = req.body;
  
      const newItem = new Categories(data);
  
      let result = await newItem.save();
  
      return res.send({ code: 200, message: "Tạo thành công", payload: result });
    } catch (err) {
      console.log("««««« err »»»»»", err);
      return res.status(500).json({ code: 500, error: err });
    }
  },

  deleteCategories: async function (req, res, next) {
  try {
    const { id } = req.params;

    let found = await Categories.findByIdAndDelete(id);

    if (found) {
      return res.send({ code: 200, payload: found, message: "Xóa thành công" });
    }

    return res.status(410).send({ code: 404, message: "Không tìm thấy" });
  } catch (err) {
    return res.status(500).json({ code: 500, error: err });
  }
},

  updateCategories: async function (req, res, next) {
    try {
      const { id } = req.params;
  
      const updateData = req.body;
  
      const found = await Categories.findByIdAndUpdate(id, updateData, {
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
