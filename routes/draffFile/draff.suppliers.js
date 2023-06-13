/* var express = require("express");
var router = express.Router();
const yup = require("yup");

const { generationID, writeFileSync } = require("../utils");

const suppliers = require("../data/suppliers.json");
const phoneRegExp = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g

const { init } = require("../app");


router.get("/", function (req, res, next) {
  res.status(200).json({
    code: 2001,
    message: "Get success!!",
    payload: suppliers,
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
      const supplier = suppliers.find((s) => s.id.toString() === id.toString());

      if (!supplier) {
        res.status(404).json({
          code: 4041,
          message: "Get detail fail!!",
        });
      }

      res.status(200).json({
        code: 2001,
        message: "Get detail success!!",
        payload: supplier,
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
  const { name, email,phoneNumber,address } = req.body;

   const validationSchema = yup.object().shape({
    name: yup.string().max(50).required(),
    email: yup.string().email().required(),
    phoneNumber: yup.string()
    .required("required")
    .matches(phoneRegExp, 'Phone number is not valid')
    .min(10, "Nhap du 10 so")
    .max(10, "Nhap du 10 so"),
    address:yup.string()
    
  });

  validationSchema
    .validate(req.body,{ abortEarly: false })
    .then(() => {
      console.log("Validation passed");
      const initID = generationID();

      const newSuppliers = {
        id: initID,
        name,
        email,
        phoneNumber,
        address 
      };
      suppliers.push(newSuppliers);

      const newS = suppliers.find((s) => s.id.toString() === initID.toString());

      writeFileSync("./data/suppliers.json", suppliers);

      res.status(200).json({
        code: 2001,
        message: "Create success!!",
        payload: newS
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
    name: yup.string().max(50).required(),
    email: yup.string().email().required(),
    phoneNumber: yup.string()
    .required("required")
    .matches(phoneRegExp, 'Phone number is not valid')
    .min(10, "Nhap du 10 so")
    .max(10, "Nhap du 10 so"),
    address:yup.string()
    })
  });

  validationSchema
    .validate({body: req.body},{params: req.params},{abortEarly:false})
    .then(() => {
      console.log("Validation passed");
      const checkSuppliersExits = suppliers.find((s) => s.id.toString() === id.toString());

      if(!checkSuppliersExits){
        res.status(404).json({
          code: 4041,
          message: "Not found",
        });
      }

      const suppliersUpdate={
        ...req.body,
        id,
      }
      const newSuppliersList = suppliers.map((s) =>{
        if(s.id.toString() === id.toString()){
          return suppliersUpdate;
        }
        return s;
      })

      writeFileSync("./data/suppliers.json", newSuppliersList);

      res.status(200).json({
        code: 2001,
        message: "Update success!!",
        payload: suppliersUpdate,
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
    name: yup.string().max(50).required(),
    email: yup.string().email().required(),
    phoneNumber: yup.string()
    .required("required")
    .matches(phoneRegExp, 'Phone number is not valid')
    .min(10, "Nhap du 10 so")
    .max(10, "Nhap du 10 so"),
    address:yup.string()
    })
  });

  validationSchema
    .validate({body: req.body},{params: req.params},{abortEarly:false})
    .then(() => {
      console.log("Validation passed");
      const checkSuppliersExits = suppliers.find((s) => s.id.toString() === id.toString());

      if(!checkSuppliersExits){
        res.status(404).json({
          code: 4041,
          message: "Not found",
        });
      }

      const suppliersUpdate={
        ...checkSuppliersExits,
        ...req.body,
        id,
      }
      const newSuppliersList = suppliers.map((s) =>{
        if(s.id.toString() === id.toString()){
          return suppliersUpdate;
        }
        return s;
      })

      writeFileSync("./data/suppliers.json", newSuppliersList);

      res.status(200).json({
        code: 2001,
        message: "Update success!!",
        payload: suppliersUpdate,
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
      const newSuppliersList = suppliers.filter((s) => s.id.toString() !== id.toString());

      writeFileSync("./data/suppliers.json", newSuppliersList);

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

const { Suppliers } = require("../../models");

// GET ALL
router.get("/", async (req, res, next) => {
  try {
    let results = await Suppliers.find();
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

    let found = await Suppliers.findById(id);
    // let found = await Suppliers.find({ _id: id });

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
    console.log('««««« data »»»»»', data);

    const newItem = new Suppliers(data);
    console.log('««««« newItem »»»»»', newItem);

    let result = await newItem.save();
    console.log('««««« result »»»»»', result);

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

    let found = await Suppliers.findByIdAndDelete(id);

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
});

module.exports = router;
