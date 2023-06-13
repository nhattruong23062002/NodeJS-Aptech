
const express = require("express");
const router = express.Router();

const { Products } = require("../models");

// GET ALL
router.get("/test", async (req, res, next) => {
    const total =await Products.countDocuments()
    const conditionFind = {
       /*Cau 1a ,1b */discount:{$lte :10},
       /*Cau 2a ,2b */stock:{$lte :10}



    }
  try {
    let results = await Products.find(conditionFind).populate('categories').populate('suppliers');

    return res.send({ code: 200,total,totalResult: results.length, payload: results });
  } catch (err) {
    console.log("««««« err »»»»»", err);
    return res.status(500).json({ code: 500, error: err });
  }
});

module.exports = router;
