const { Employees } = require("../../models");
const {generateToken,generateRefreshToken} = require('../../helpers/jwtHelper');
const JWT = require('jsonwebtoken');
const jwtSettings = require('../../constants/jwtSetting');


module.exports = {
  login: async (req, res, next) => {
    try {
      const { email } = req.body;

      const employee = await Employees.findOne({ email }).select('-password').lean();

      const token = generateToken(employee);
      const refreshToken = generateRefreshToken(employee._id);

      return res.status(200).json({
        token,
        refreshToken
      });
    } catch (err) {
      res.status(400).json({
        statusCode: 400,
        message: 'Looi',
      });
    }
  },
  
  checkRefreshToken: async (req, res, next) => {
    try {
      const { refreshToken } = req.body;

      JWT.verify(refreshToken, jwtSettings.SECRET, async (err, decoded) => {
        if (err) {
          return res.status(401).json({
            message: 'refreshToken is invalid',
          });
        } else {
          console.log('««««« decoded »»»»»', decoded);
          const { id } = decoded;

          const employee = await Employees.findById(id).select('-password').lean();

          if (employee && employee.isActive) {
            const token = generateToken(employee);
            
            return res.status(200).json({ token });
          }
          return res.sendStatus(401);
        }
      });
    } catch (err) {
      console.log('««««« err »»»»»', err);
      res.status(400).json({
        statusCode: 400,
        message: 'Lỗi',
      });
    }
  },



  basic: async (req, res, next) => {
    try {
      const employee = await Employees.findById(req.user._id).select('-password').lean();
      const token = generateToken(employee);
      const refreshToken = generateRefreshToken(employee._id);

      res.json({
        token,
        refreshToken,
      });
    } catch (err) {
      res.sendStatus(400);
    }
  },

  getMe: async (req, res, next) => {
    try {
      res.status(200).json({
        payload: req.user,
      });
    } catch (err) {
      res.sendStatus(500);
    }
  },


  getEmployeesAll: async (req, res, next) => {
    try {
      let results = await Employees.find();
      return res.send({ code: 200, payload: results });
    } catch (err) {
      console.log("««««« err »»»»»", err);
      return res.status(500).json({ code: 500, error: err });
    }
  },

  getEmployeesDetail:  async (req, res, next) => {
    try {
      const { id } = req.params;
  
      let found = await Employees.findById(id);
      // let found = await Employees.find({ _id: id });
  
      if (found) {
        return res.send({ code: 200, payload: found });
      }
  
      return res.status(410).send({ code: 404, message: "Không tìm thấy" });
    } catch (err) {
      return res.status(500).json({ code: 500, error: err });
    }
  },

  createEmployees:   async function (req, res, next) {
    try {
      const data = req.body;
  
      const newItem = new Employees(data);
  
      let result = await newItem.save();
  
      return res.send({ code: 200, message: "Tạo thành công", payload: result });
    } catch (err) {
      console.log("««««« err »»»»»", err);
      return res.status(500).json({ code: 500, error: err });
    }
  },

  deleteEmployees: async function (req, res, next) {
  try {
    const { id } = req.params;

    let found = await Employees.findByIdAndDelete(id);

    if (found) {
      return res.send({ code: 200, payload: found, message: "Xóa thành công" });
    }

    return res.status(410).send({ code: 404, message: "Không tìm thấy" });
  } catch (err) {
    return res.status(500).json({ code: 500, error: err });
  }
},

  updateEmployees: async function (req, res, next) {
    try {
      const { id } = req.params;
  
      const updateData = req.body;
  
      const found = await Employees.findByIdAndUpdate(id, updateData, {
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
