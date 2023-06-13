/* var express = require("express");
var router = express.Router();
const yup = require("yup");
const { generationID, writeFileSync } = require("../utils");

let products = require("../data/products.json");

const { init } = require("../app");

router.get("/", function (req, res, next) {
  res.status(200).json({
    code: 2001,
    message: "Get success!!",
    payload: products,
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

      const product = products.find((p) => p.id.toString() === id.toString());
      if (!product) {
        res.status(404).json({
          code: 4041,
          message: "Get detail fail!!",
        });
      }

      res.status(200).json({
        code: 2001,
        message: "Get detail success!!",
        payload: product,
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
  const { name, price, supplierId,description,discount } = req.body;

  const validationSchema = yup.object().shape({
    name: yup.string().max(50).required(),
    price: yup.number().min(0).required(),
    supplierId: yup.string().test('idLength','Nhap dung 13 ky tu',val => {
      if(!val)return true;
      return val.length === 13}),
    description: yup.string(),
    discount:yup.number().min(0).max(100) 
  });

  validationSchema
    .validate(req.body,{ abortEarly: false })
    .then(() => {
      console.log("Validation passed");
      const initID = generationID();

      const newProduct = {
        id: initID,
        name,
        price,
        ...(supplierId && {supplierId}),
        description,
        discount
      };
      products.push(newProduct);
    
      const newP = products.find((p) => p.id.toString() === initID.toString());
    
      writeFileSync("./data/products.json", products);
    
      res.status(200).json({
        code: 2001,
        message: "Create success!!",
        payload: newP,
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
  const { id } = req.params;

  const validationSchema = yup.object().shape({
    body: yup.object({
      id: yup.number(),
      name: yup.string().max(50).required(),
      price: yup.number().min(0).required(),
      supplierId: yup.string().test('idLength','Nhap dung 13 ky tu',val => {
        if(!val)return true;
        return val.length === 13}),
      description: yup.string(),
      discount:yup.number().min(0).max(100) 

    })
  });

  validationSchema
    .validate({body: req.body},{params: req.params},{abortEarly:false})
    .then(() => {
      console.log("Validation passed");

      const checkProductExits = products.find(
        (p) => p.id.toString() === id.toString()
      );
    
      if (!checkProductExits) {
        res.status(404).json({
          code: 4041,
          message: "Not found",
        });
      }
    
      const productUpdate = {
        ...req.body,
        id,
      };
    
      const newProductList = products.map((p) => {
        if (p.id.toString() === id.toString()) {
          return productUpdate;
        }
        return p;
      });
    
      writeFileSync("./data/products.json", newProductList);
    
      res.status(200).json({
        code: 2001,
        message: "Update success!!",
        payload: productUpdate,
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
  const { id } = req.params;

  const validationSchema = yup.object().shape({
    body: yup.object({
      id: yup.number(),
      name: yup.string().max(50).required(),
      price: yup.number().min(0).required(),
      supplierId: yup.string().test('idLength','Nhap dung 13 ky tu',val => {
        if(!val)return true;
        return val.length === 13}),
      description: yup.string(),
      discount:yup.number().min(0).max(100) 

    })
  });

  validationSchema
    .validate({body: req.body},{params: req.params},{abortEarly:false})
    .then(() => {
      console.log("Validation passed");

      const checkProductExits = products.find(
        (p) => p.id.toString() === id.toString()
      );
    
      if (!checkProductExits) {
        res.status(404).json({
          code: 4041,
          message: "Not found",
        });
      }
    
      const productUpdate = {
        ...checkProductExits,
        ...req.body,
        id,
      };
    
      const newProductList = products.map((p) => {
        if (p.id.toString() === id.toString()) {
          return productUpdate;
        }
        return p;
      });
    
      products = newProductList;
      writeFileSync("./data/products.json", newProductList);
    
      res.status(200).json({
        code: 2001,
        message: "Update success!!",
        payload: productUpdate,
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
  const { id } = req.params;

  const validationSchema = yup.object().shape({
    id: yup.string().test('idLength','Nhap dung 13 ky tu',val => {
      if(!val)return true;
      return val.length === 13})
  });

  validationSchema
    .validate(req.params)
    .then(() => {
      console.log("Validation passed");

      const newProductList = products.filter(
        (p) => p.id.toString() !== id.toString()
      );
      products = newProductList;

      writeFileSync("./data/products.json", newProductList);
    
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

const { Products } = require("../../models");

// GET ALL
router.get("/", async (req, res, next) => {
  try {
    let results = await       
    Products.find().populate('categories').populate('suppliers');
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

    let found = await Products.findById(id).populate('categories').populate('suppliers');
    // let found = await Products.find({ _id: id });

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

    const newItem = new Products(data);

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

    let found = await Products.findByIdAndDelete(id);

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
});

module.exports = router;
