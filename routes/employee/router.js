const express = require("express");
const router = express.Router();
const passport = require('passport');

const { validateSchema } = require("../../utils");
const {
  loginSchema,
  getEmployeeSchema,
  createEmployeesSchema,
  editEmployeesSchema,
} = require("./validations");
const allowRoles = require('../../middlewares/checkRole');

const {
  login,
  getMe,
  checkRefreshToken,
  basic,
  getEmployeesAll,
  getEmployeesDetail,
  createEmployees,
  updateEmployees,
  deleteEmployees,
} = require("./controller");

router
  .route('/login')
  .post(
    validateSchema(loginSchema),
    passport.authenticate('local', { session: false }),
    login,
    )

router.route('/refresh-token')
  .post(checkRefreshToken)

router.route('/basic')
  .get(passport.authenticate('basic', { session: false }), basic)
  
router
  .route('/profile')
  .get(passport.authenticate('jwt', { session: false }), getMe )

router
  .route("/")
  .get(passport.authenticate('jwt', { session: false }), allowRoles('GET_ALL_EMPLOYEE'),getEmployeesAll)
  .post(validateSchema(createEmployeesSchema), createEmployees);

router
  .route("/:id")
  .get(validateSchema(getEmployeeSchema),passport.authenticate('jwt', { session: false }), getEmployeesDetail)
  .patch(passport.authenticate('jwt', { session: false }),allowRoles('UPDATE_EMPLOYEE'),validateSchema(editEmployeesSchema), updateEmployees)
  .delete(passport.authenticate('jwt', { session: false }),allowRoles('DELETE_EMPLOYEE'),validateSchema(getEmployeeSchema), deleteEmployees);

module.exports = router;
