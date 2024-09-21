const express = require("express");
const router = express.Router();

// login and sign up controlelr
const {
    login,
    signup
} = require("../controllers/AuthController.js");

// ********************************************************************************************************
//                                      Authentication routes
// ********************************************************************************************************

// Route for user login
router.post("/login", login)

// Route for user signup
router.post("/signup", signup)

// ********************************************************************************************************
//                                      Employee routes
// ********************************************************************************************************

const { 
    saveEmployeeData,
    employeeList,
    deleteEmployeeData,
    fetchEmployeeData,
    updateEmployee
 } = require("../controllers/EmployeeController");

router.post("/createEmployee", saveEmployeeData);
router.get("/employeeList", employeeList);
router.delete("/deleteData", deleteEmployeeData);
router.get("/getEmployeeData", fetchEmployeeData);
router.post("/updateEmployeeData", updateEmployee)


module.exports = router;