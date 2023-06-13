/* var express = require("express");
var router = express.Router();

const yup = require("yup");

const { generationID, writeFileSync } = require("../utils");

const employees = require("../data/employees.json");
const phoneRegExp = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g


const { init } = require("../app");

router.get("/", function (req, res, next) {
  res.status(200).json({
    code: 2001,
    message: "Get success!!",
    payload: employees,
  });
});

router.get("/:id", function (req, res, next) {
  const id = req.params.id;

  const validationSchema = yup.object().shape({
    id: yup.number()
  });

  validationSchema
  .validate(req.params)
  .then(() => {
    console.log("Validation passed");
    const employee = employees.find((e) => e.id.toString() === id.toString());

    if (!employee) {
      res.status(404).json({
        code: 4041,
        message: "Get detail fail!!",
      });
    }
  
    res.status(200).json({
      code: 2001,
      message: "Get detail success!!",
      payload: employee,
    });

  })
  .catch((err) => {
    console.log(err);
    res.status(400).json({
      code: 4001,
      message: "Loi",
      payload: err,
    });
  });
});


router.post("/", function (req, res, next) {
  const { firstName,lastName,phoneNumber,address,email,birthday } = req.body;

  const validationSchema = yup.object().shape({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    phoneNumber: yup.string()
    .required("required")
    .matches(phoneRegExp, 'Phone number is not valid')
    .min(10, "Nhap du 10 so")
    .max(10, "Nhap du 10 so"),
    address:yup.string().required(),
    email: yup.string().email().required(),
    birthday: yup.date().required()  
  });

  validationSchema
  .validate(req.body,{ abortEarly: false })
  .then(() => {
    console.log("Validation passed");
    const initID = generationID();

    const newEmployees= {
      id: initID,
      firstName,
      lastName,
      phoneNumber,
      address,
      email,
      birthday
    };
    employees.push(newEmployees);
  
    const newE = employees.find((e) => e.id.toString() === initID.toString());
  
    writeFileSync("./data/employees.json", employees);
  
    res.status(200).json({
      code: 2001,
      message: "Create success!!",
      payload: newE
    });
  
  })
  .catch((err) => {
    console.log(err);
    res.status(400).json({
      code: 4001,
      message: "Loi",
      payload: err.errors,
    });
  });
 
});

router.put("/:id", function (req, res, next) {

  const {id} = req.params;

  const validationSchema = yup.object().shape({
    body: yup.object({
      id:yup.number(),
      firstName: yup.string().required(),
      lastName: yup.string().required(),
      phoneNumber: yup.string()
      .required("required")
      .matches(phoneRegExp, 'Phone number is not valid')
      .min(10, "Nhap du 10 so")
      .max(10, "Nhap du 10 so"),
      address:yup.string().required(),
      email: yup.string().email().required(),
      birthday: yup.date().required()  
    })
  });

  validationSchema
  .validate({body: req.body},{params: req.params},{abortEarly:false})
  .then(() => {
    console.log("Validation passed");

    const checkEmployeesExits = employees.find((e) => e.id.toString() === id.toString());

    if(!checkEmployeesExits){
      res.status(404).json({
        code: 4041,
        message: "Not found",
      });
    }
  
    const employeesUpdate={
      ...req.body,
      id,
    }
    const newEmployeesList = employees.map((e) =>{
      if(e.id.toString() === id.toString()){
        return employeesUpdate;
      }
      return c;
    })
  
    writeFileSync("./data/employees.json", newEmployeesList);
  
    res.status(200).json({
      code: 2001,
      message: "Update success!!",
      payload: employeesUpdate,
    });
  })
  .catch((err) => {
    console.log(err);
    res.status(400).json({
      code: 4001,
      message: "Loi",
      payload: err.errors,
    });
  });
 

});

router.patch("/:id", function (req, res, next) {

  const {id} = req.params;

  const validationSchema = yup.object().shape({
    body: yup.object({
      id:yup.number(),
      firstName: yup.string().required(),
      lastName: yup.string().required(),
      phoneNumber: yup.string()
      .required("required")
      .matches(phoneRegExp, 'Phone number is not valid')
      .min(10, "Nhap du 10 so")
      .max(10, "Nhap du 10 so"),
      address:yup.string().required(),
      email: yup.string().email().required(),
      birthday: yup.date().required()  
    })
  });

  validationSchema
  .validate({body: req.body},{params: req.params},{abortEarly:false})
  .then(() => {
    console.log("Validation passed");

    const checkEmployeesExits = employees.find((e) => e.id.toString() === id.toString());

    if(!checkEmployeesExits){
      res.status(404).json({
        code: 4041,
        message: "Not found",
      });
    }
  
    const employeesUpdate={
      ...checkEmployeesExits,
      ...req.body,
      id,
    }
    const newEmployeesList = employees.map((e) =>{
      if(e.id.toString() === id.toString()){
        return employeesUpdate;
      }
      return e;
    })
  
    writeFileSync("./data/employees.json", newEmployeesList);
  
    res.status(200).json({
      code: 2001,
      message: "Update success!!",
      payload: employeesUpdate,
    });
  })
  .catch((err) => {
    console.log(err);
    res.status(400).json({
      code: 4001,
      message: "Loi",
      payload: err.errors,
    });
  });
 

});


router.delete("/:id", function (req, res, next) {
  const {id} = req.params;

  const validationSchema = yup.object().shape({
    id: yup.string().test('idLength','Nhap 13 ky tu moi dung',val => val.length === 13)
  });

  validationSchema
  .validate(req.params)
  .then(() => {
    console.log("Validation passed");

    const newEmployeesList = employees.filter((e) => e.id.toString() !== id.toString());

    writeFileSync("./data/employees.json", newEmployeesList);
  
    res.status(200).json({
      code: 2001,
      message: "Delete success!!",
    });
    
  })
  .catch((err) => {
    console.log(err);
    res.status(400).json({
      code: 4001,
      message: "Loi",
      payload: err.errors,
    });
  });


});

module.exports = router;
 */

const express = require("express");
const router = express.Router();

const { Employees } = require("../../models");

// GET ALL
router.get("/", async (req, res, next) => {
  try {
    let results = await Employees.find();
    return res.send({ code: 200, payload: results });
  } catch (err) {
    console.log("««««« err »»»»»", err);
    return res.status(500).json({ code: 500, error: err });
  }
});

// GET DETAIL
router.get("/:id", async (req, res, next) => {
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
});

// POST
router.post("/", async function (req, res, next) {
  try {
    const data = req.body;

    const newItem = new Employees(data);

    let result = await newItem.save();

    return res.send({ code: 200, message: "Tạo thành công", payload: result });
  } catch (err) {
    console.log("««««« err »»»»»", err);
    return res.status(500).json({ code: 500, error: err });
  }
});

// DELETE
router.delete("/:id", async function (req, res, next) {
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
});

// UPDATE
router.patch("/:id", async function (req, res, next) {
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
});

module.exports = router;
