/* var express = require("express");
var router = express.Router();

const yup = require("yup");

const { generationID, writeFileSync } = require("../utils");

const customers = require("../data/customers.json");
const phoneRegExp = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g


const { init } = require("../app");


router.get("/", function (req, res, next) {
  res.status(200).json({
    code: 2001,
    message: "Get success!!",
    payload: customers,
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
    const customer = customers.find((c) => c.id.toString() === id.toString());

    if (!customer) {
      res.status(404).json({
        code: 4041,
        message: "Get detail fail!!",
      });
    }
  
    res.status(200).json({
      code: 2001,
      message: "Get detail success!!",
      payload: customer,
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
  const { firstName,lastName, phoneNumber,address,email,birthday } = req.body;

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

    const newCustomers= {
      id: initID,
      firstName,
      lastName, 
      phoneNumber,
      address,
      email,
      birthday
    };
    customers.push(newCustomers);
  
    const newC = customers.find((c) => c.id.toString() === initID.toString());
  
    writeFileSync("./data/customers.json", customers);
  
    res.status(200).json({
      code: 2001,
      message: "Create success!!",
      payload: newC
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
      id: yup.number(),
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

    const checkCustomersExits = customers.find((c) => c.id.toString() === id.toString());

    if(!checkCustomersExits){
      res.status(404).json({
        code: 4041,
        message: "Not found",
      });
    }
  
    const customersUpdate={
      ...req.body,
      id,
    }
    const newCustomersList = customers.map((c) =>{
      if(c.id.toString() === id.toString()){
        return customersUpdate;
      }
      return c;
    })
  
    writeFileSync("./data/customers.json", newCustomersList);
  
    res.status(200).json({
      code: 2001,
      message: "Update success!!",
      payload: customersUpdate,
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
      id: yup.number(),
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

    const checkCustomersExits = customers.find((c) => c.id.toString() === id.toString());

    if(!checkCustomersExits){
      res.status(404).json({
        code: 4041,
        message: "Not found",
      });
    }
  
    const customersUpdate={
      ...checkCustomersExits,
      ...req.body,
      id,
    }
    const newCustomersList = customers.map((c) =>{
      if(c.id.toString() === id.toString()){
        return customersUpdate;
      }
      return c;
    })
  
    writeFileSync("./data/customers.json", newCustomersList);
  
    res.status(200).json({
      code: 2001,
      message: "Update success!!",
      payload: customersUpdate,
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

    const newCustomersList = customers.filter((c) => c.id.toString() !== id.toString());

    writeFileSync("./data/customers.json", newCustomersList);
  
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

const { Customers } = require("../../models");

// GET ALL
router.get("/", async (req, res, next) => {
  try {
    let results = await Customers.find();
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

    let found = await Customers.findById(id);
    // let found = await Customers.find({ _id: id });

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

    const newItem = new Customers(data);

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

    let found = await Customers.findByIdAndDelete(id);

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
});

module.exports = router;
