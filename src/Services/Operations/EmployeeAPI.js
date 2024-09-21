import { endpoints } from "../apis";
import { apiConnector } from "./API_Connector";
import { toast } from "react-hot-toast";

const {
    EMPLOYEE_LIST_API,
    CREATE_EMPLOYEE_API,
    DELETE_EMPLOYEE_API,
    GET_EMPLOYEE_DATA_API,
    UPDATE_EMPLOYEE_API
} = endpoints;


// create employee
export const createEmployee = async (data, navigate) => {
    try {
        const response = await apiConnector("POST", CREATE_EMPLOYEE_API,
            data
        );
        console.log("CREATE_EMPLOYEE_API API response............", response);
        if (!response?.data?.success) {
            throw new Error("Could Not CREATE_EMPLOYEE");
        }
        navigate("/employeeList");
    } catch (error) {
        console.log("CREATE_EMPLOYEE_API API ERROR............", error);
        toast.error("User Already Exist");
    }
}

//  get employee list
export const getEmployeeList = async () => {
    let result = [];
    try {
        const response = await apiConnector("GET", EMPLOYEE_LIST_API);
        // console.log("EMPLOYEE_LIST_API API response............", response);
        if (!response?.data?.success) {
            throw new Error("Could Not Fetch Employee List");
        }

        result = response?.data?.data
    } catch (error) {
        // console.log("EMPLOYEE_LIST_API API ERROR............", error);
    }
    return result;
}

// edit Employee
export const editEmployee = async (data, navigate) => {
    try {
        const response = await apiConnector("POST", UPDATE_EMPLOYEE_API, data);
        // console.log("UPDATE_EMPLOYEE_API API response............", response);
        if (!response?.data?.success) {
            throw new Error("Could Not update employee data");
        }
        navigate("/employeeList");
    } catch (error) {
        // console.log("UPDATE_EMPLOYEE_API API ERROR............", error);
    }
}
// delete employee data
export const deleteEmployeeData = async (id) => {
    try {
        const response = await apiConnector("DELETE", DELETE_EMPLOYEE_API,
            { employeeId: id }
        );
        // console.log("employeeId API response............", response);
        if (!response?.data?.success) {
            throw new Error("Could Not Fetch Employee List");
        }
    } catch (error) {
        // console.log("DELETE_EMPLOYEE_API API ERROR............", error);
    }
}

// fetch employee data
export const findEmployeeData = async (id) => {
    let result;
    try {
        // console.log("emp id in api", id);
        const response = await apiConnector("GET", GET_EMPLOYEE_DATA_API, id, null, null);
        // console.log("get employee data api response>", response);
    } catch (error) {
        // console.log("get employee data api error", error);
    }
}