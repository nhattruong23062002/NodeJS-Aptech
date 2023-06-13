/* var express = require("express");
var router = express.Router();

const yup = require("yup");

const { generationID, writeFileSync } = require("../utils");

const orders = require("../data/orders.json");

const { init } = require("../app");


router.get("/", function (req, res, next) {
  res.status(200).json({
    code: 2001,
    message: "Get success!!",
    payload: orders,
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
    const order = orders.find((o) => o.id.toString() === id.toString());

    if (!order) {
      res.status(404).json({
        code: 4041,
        message: "Get detail fail!!",
      });
    }
  
    res.status(200).json({
      code: 2001,
      message: "Get detail success!!",
      payload: order,
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
  const { createdDate,shippedDate,status,description,shippingAddress,paymentType,customerId,employeeId } = req.body;

  const validationSchema = yup.object().shape({
    createdDate: yup.date().required(),
    shippedDate:  yup.date().required(),
    status:yup.string(),
    description:yup.string(),
    shippingAddress: yup.string().required(),
    paymentType: yup.string().required()  ,
    customerId: yup.string().test('idLength','Nhap dung 13 ky tu',val => {
      if(!val)return true;
      return val.length === 13}),
    employeeId: yup.string().test('idLength','Nhap dung 13 ky tu',val => {
      if(!val)return true;
      return val.length === 13}),
  });

  validationSchema
  .validate(req.body,{ abortEarly: false })
  .then(() => {
    console.log("Validation passed");
    const initID = generationID();

    const newOrder= {
      id: initID,
      createdDate,
      shippedDate,
      status,
      description,
      shippingAddress,
      paymentType,
      ...(customerId && {customerId}),
      ...(employeeId && {employeeId}),
    };
    orders.push(newOrder);
  
    const newO = orders.find((o) => o.id.toString() === initID.toString());
  
    writeFileSync("./data/orders.json", orders);
  
    res.status(200).json({
      code: 2001,
      message: "Create success!!",
      payload: newO
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
        createdDate: yup.date().required(),
        shippedDate:  yup.date().required(),
        status:yup.string(),
        description:yup.string(),
        shippingAddress: yup.string().required(),
        paymentType: yup.string().required()  ,
        customerId: yup.string().test('idLength','Nhap dung 13 ky tu',val => {
          if(!val)return true;
          return val.length === 13}),
        employeeId: yup.string().test('idLength','Nhap dung 13 ky tu',val => {
          if(!val)return true;
          return val.length === 13}),
    })
  });

  validationSchema
  .validate({body: req.body},{params: req.params},{abortEarly:false})
  .then(() => {
    console.log("Validation passed");

    const checkOrdersExits = orders.find((o) => o.id.toString() === id.toString());

    if(!checkOrdersExits){
      res.status(404).json({
        code: 4041,
        message: "Not found",
      });
    }
  
    const ordersUpdate={
      ...req.body,
      id,
    }
    const newOrdersList = orders.map((o) =>{
      if(o.id.toString() === id.toString()){
        return ordersUpdate;
      }
      return o;
    })
  
    writeFileSync("./data/orders.json", newOrdersList);
  
    res.status(200).json({
      code: 2001,
      message: "Update success!!",
      payload: ordersUpdate,
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
        createdDate: yup.date().required(),
        shippedDate:  yup.date().required(),
        status:yup.string(),
        description:yup.string(),
        shippingAddress: yup.string().required(),
        paymentType: yup.string().required()  ,
        customerId: yup.string().test('idLength','Nhap dung 13 ky tu',val => {
          if(!val)return true;
          return val.length === 13}),
        employeeId: yup.string().test('idLength','Nhap dung 13 ky tu',val => {
          if(!val)return true;
          return val.length === 13}),
      })
    });
  
    validationSchema
    .validate({body: req.body},{params: req.params},{abortEarly:false})
    .then(() => {
      console.log("Validation passed");
  
      const checkOrdersExits = orders.find((o) => o.id.toString() === id.toString());
  
      if(!checkOrdersExits){
        res.status(404).json({
          code: 4041,
          message: "Not found",
        });
      }
    
      const ordersUpdate={
        ...checkOrdersExits,
        ...req.body,
        id,
      }
      const newOrdersList = orders.map((o) =>{
        if(o.id.toString() === id.toString()){
          return ordersUpdate;
        }
        return o;
      })
    
      writeFileSync("./data/orders.json", newOrdersList);
    
      res.status(200).json({
        code: 2001,
        message: "Update success!!",
        payload: ordersUpdate,
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

    const newOrdersList = orders.filter((o) => o.id.toString() !== id.toString());

    writeFileSync("./data/orders.json", newOrdersList);
  
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

const { Orders } = require("../../models");

// GET ALL
router.get("/", async (req, res, next) => {
  try {
    let results = await Orders.find()
      .lean()
      .populate("customers")
      .populate("employees")
      .populate("orderDetails.products")
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

    let found = await Orders.findById(id)
      .lean()
      .populate("customers")
      .populate("employees")
      .populate("orderDetails.products")
    // let found = await Orders.find({ _id: id });

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

    const newItem = new Orders(data);

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

    let found = await Orders.findByIdAndDelete(id);

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
});

module.exports = router;
