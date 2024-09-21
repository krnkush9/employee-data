const BASE_URL = process.env.REACT_APP_BASE_URL

export const endpoints = {
    LOGIN_API: BASE_URL + "/login",
    SIGNUP_API: BASE_URL + "/signup",
    CREATE_EMPLOYEE_API: BASE_URL + "/createEmployee",
    EMPLOYEE_LIST_API: BASE_URL + "/employeeList",
    DELETE_EMPLOYEE_API:  BASE_URL + "/deleteData",
    GET_EMPLOYEE_DATA_API: BASE_URL + "/getEmployeeData",
    UPDATE_EMPLOYEE_API: BASE_URL + "/updateEmployeeData",
}