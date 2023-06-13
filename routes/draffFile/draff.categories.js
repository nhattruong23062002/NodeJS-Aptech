/* var express = require("express");
var router = express.Router();
const yup = require("yup");
const { generationID, writeFileSync } = require("../utils");

const categories = require("../data/categories.json");

const { init } = require("../app");


router.get("/", function (req, res, next) {
  res.status(200).json({
    code: 2001,
    message: "Get success!!",
    payload: categories,
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

      const cate = categories.find((c) => c.id.toString() === id.toString());

      if (!cate) {
        res.status(404).json({
          code: 4041,
          message: "Get detail fail!!",
        });
      }

      res.status(200).json({
        code: 2001,
        message: "Get detail success!!",
        payload: cate,
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
  const { name, description } = req.body;

  const validationSchema = yup.object().shape({
    name: yup.string().max(50).required(),
    description: yup.string(),
  });

  validationSchema
    .validate(req.body, { abortEarly: false })
    .then(() => {
      console.log("Validation passed");

      const initID = generationID();

      const newCategories = {
        id: initID,
        name,
        description,
      };
      categories.push(newCategories);

      const newC = categories.find(
        (c) => c.id.toString() === initID.toString()
      );

      writeFileSync("./data/categories.json", categories);

      res.status(200).json({
        code: 2001,
        message: "Create success!!",
        payload: newC,
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
      description: yup.string(),
    }),
  });

  validationSchema
    .validate({ body: req.body }, { params: req.params }, { abortEarly: false })
    .then(() => {
      console.log("Validation passed");

      const checkCategoriesExits = categories.find(
        (c) => c.id.toString() === id.toString()
      );

      if (!checkCategoriesExits) {
        res.status(404).json({
          code: 4041,
          message: "Not found",
        });
      }

      const categoriesUpdate = {
        ...req.body,
        id,
      };

      const newCategoriesList = categories.map((c) => {
        if (c.id.toString() === id.toString()) {
          return categoriesUpdate;
        }
        return c;
      });

      writeFileSync("./data/categories.json", newCategoriesList);

      res.status(200).json({
        code: 2001,
        message: "Update success!!",
        payload: categoriesUpdate,
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
      description: yup.string(),
    }),
  });

  validationSchema
    .validate({ body: req.body }, { params: req.params }, { abortEarly: false })
    .then(() => {
      console.log("Validation passed");

      const checkCategoriesExits = categories.find(
        (c) => c.id.toString() === id.toString()
      );

      if (!checkCategoriesExits) {
        res.status(404).json({
          code: 4041,
          message: "Not found",
        });
      }

      const categoriesUpdate = {
        ...checkCategoriesExits,
        ...req.body,
        id,
      };

      const newCategoriesList = categories.map((c) => {
        if (c.id.toString() === id.toString()) {
          return categoriesUpdate;
        }
        return c;
      });

      writeFileSync("./data/categories.json", newCategoriesList);

      res.status(200).json({
        code: 2001,
        message: "Update success!!",
        payload: categoriesUpdate,
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
    id: yup.string().test('idLength','Nhap 13 ky tu moi dung',val => val.length === 13)
  });

  validationSchema
  .validate(req.params)
  .then(() => {
    console.log("Validation passed");
    const newCategoriesList = categories.filter(
      (c) => c.id.toString() !== id.toString()
    );
  
    writeFileSync("./data/categories.json", newCategoriesList);
  
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

const { Categories } = require("../../models");

// GET ALL
router.get("/", async (req, res, next) => {
  try {
    let results = await Categories.find();
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

    let found = await Categories.findById(id);
    // let found = await Categories.find({ _id: id });

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

    const newItem = new Categories(data);

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

    let found = await Categories.findByIdAndDelete(id);

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
});

module.exports = router;
