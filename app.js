var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const passport = require('passport');

require('dotenv').config()

const {
  passportConfig,
  passportConfigLocal,
  passportConfigBasic
} = require('./middlewares/passport');


var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var questionsRouter = require("./routes/question/router");

var productRouter = require("./routes/product/router");
var categoriesRouter = require("./routes/category/router");
var supplierRouter = require("./routes/supplier/router");
var customersRouter = require("./routes/customer/router");
var employeesRouter = require("./routes/employee/router");
var ordersRouter = require("./routes/order/router");
var mediaRouter = require('./routes/upload');


const { CONNECTION_STRING } = require("./constants/dbSetting");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

passport.use(passportConfig);
passport.use(passportConfigLocal);
passport.use(passportConfigBasic);


app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Add CORS here
app.use(
  cors({
    origin: "*",
  })
);

mongoose.set("strictQuery", false);
mongoose.connect(CONNECTION_STRING);

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/products", passport.authenticate('jwt', { session: false }), productRouter);
app.use("/categories", passport.authenticate('jwt', { session: false }), categoriesRouter);
app.use("/suppliers", passport.authenticate('jwt', { session: false }), supplierRouter);
app.use("/customers", passport.authenticate('jwt', { session: false }), customersRouter);
app.use("/orders", passport.authenticate('jwt', { session: false }), ordersRouter);
app.use('/media', passport.authenticate('jwt', { session: false }), mediaRouter);
app.use("/employees", employeesRouter);
app.use("/questions", questionsRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
