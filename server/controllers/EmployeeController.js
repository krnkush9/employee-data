const Employee = require("../models/EmployeeSchema");


// save employee data
exports.saveEmployeeData = async (req, res) => {
    try {
        const {
            Name,
            email,
            mobileNumber,
            designation,
            gender,
            course,
            image
        } = req.body;
        
        const existsUser = await Employee.findOne({email: email});

        if (existsUser) {
            return res.status(200).json({
                success: false,
                message: "Employee data already exist",
            });
        }

        const savedData = await Employee.create({
            name: Name,
            email: email,
            mobileNo: mobileNumber,
            designation: designation,
            gender: gender,
            course: course,
            image: image
        })

        return res.status(200).json({
            success: true,
            message: "Employee data successfully",
            data: savedData
        });

    } catch (error) {
        // console.log("saveEmployeeData controller error", error);
        return res.status(500).json({
            status: false,
            message: "Can not save employee data",
            data: error.message
        })
    }
}

// get employee list
exports.employeeList = async (req, res) => {
    try {

        // console.log("employee list running.");
        const employee_List = await Employee.find();
        // console.log("exist user", employee_List)

        return res.status(200).json({
            success: true,
            message: "Employee list find successfully",
            data: employee_List
        });

    } catch (error) {
        // console.log("employee_List controller error", error);
        return res.status(500).json({
            status: false,
            message: "Can not get employee data",
            data: error.message
        })
    }
}

// updateEmployee
exports.updateEmployee = async (req, res) => {
    try {
        const {
            _id,
            Name,
            course,
            designation,
            email,
            gender,
            mobileNumber,
            image
        } = req.body;

        if(!_id) {
            return res.status(404).json({
                success:false,
                message: "ID required"
            })
        }
        const updated = await Employee.findByIdAndUpdate(_id,
            {
                name: Name,
                course: course,
                designation: designation,
                email: email,
                gender: gender,
                mobileNo: mobileNumber,
                image: image
            }
        );
        // console.log("updated ", updated)

        return res.status(200).json({
            success: true,
            message: "Employee data updated successfully",
            data: updated
        });

    } catch (error) {
        // console.log("updateEmployee controller error", error);
        return res.status(500).json({
            status: false,
            message: "Can not update employee data",
            data: error.message
        })
    }
}

// delete employee data
exports.deleteEmployeeData = async (req, res) => {
    try {
        const { employeeId } = req.body;

        const deletedEmployee = await Employee.findByIdAndDelete({ _id: employeeId });

        if (!deletedEmployee) {
            return res.status(200).json({
                success: true,
                message: "Employee Data not found",
                data: deletedEmployee
            });
        }

        return res.status(200).json({
            success: true,
            message: "Delete Employee Data successfully",
            data: deletedEmployee
        });

    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Can not delete employee data",
            data: error.message
        })
    }
}

// get employee data
exports.fetchEmployeeData = async (req, res) => {
    try {
        const { employeeId } = req.body;
        // console.log("get emp dta>>", req.body);
        // console.log("running ")
        // const employeeId = "66ed4bffe9ad49093778f243";

        const employeeData = await Employee.findById(employeeId);

        if (!employeeData) {
            return res.status(200).json({
                success: true,
                message: "Employee Data not found",
                data: employeeData
            });
        }

        return res.status(200).json({
            success: true,
            message: "Employee Data Found successfully",
            data: employeeData
        });

    } catch (error) {
        // console.log("employeeData find controller error", error);
        return res.status(500).json({
            status: false,
            message: "Employee data not found.",
            data: error.message
        })
    }
}
