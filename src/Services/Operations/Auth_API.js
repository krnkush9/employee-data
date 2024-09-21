import { toast } from "react-hot-toast"
import { apiConnector } from "./API_Connector"
import { endpoints } from "../apis"

const {
    LOGIN_API,
    SIGNUP_API
} = endpoints;

// sign up
export const signUp = async (userName, email, password, navigate) => {
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnector("POST", SIGNUP_API, {
            userName,
            email,
            password,
        })

        // console.log("SIGNUP API RESPONSE............", response)

        if (!response.data.success) {
            throw new Error(response.data.message)
        }
        toast.success("Signup Successful")
        navigate("/")
    } catch (error) {
        // console.log("SIGNUP API ERROR............", error)
        if (error.response?.data?.data === "User Already Exist.") {
            toast.error("User Already Exist");
        }
        toast.error("Signup Failed")
    }
    toast.dismiss(toastId)
}

// login
export const login = async (email, password, navigate) => {
    const toastId = toast.loading("Loading...")
    // console.log(email, password);
    try {
        const response = await apiConnector("POST", LOGIN_API, {
            email,
            password,
        })

        // console.log("LOGIN API RESPONSE............", response)

        if (!response.data.success) {
            if (response?.data?.data === "Please Create Account") {
                toast.error("Please create an account");
            }
            // throw new Error(response.data.message)
        }

        toast.success("Login Successful")

        localStorage.setItem("adminName", response.data.user.userName)
        navigate("/dashboard");
    } catch (error) {
        // console.log("LOGIN API ERROR............", error)
        if (error.response?.data?.data === "Please Create Account") {
            toast.error("Please create an account");
        } else if (error.response.data.message === "Incorrect password") {
            toast.error("Incorrect password");
        }
        toast.error("Login Failed")
    }
    toast.dismiss(toastId)
}

// logout
export const logout = (navigate) => {
    // dispatch(setToken(null))
    // dispatch(setUser(null))
    // dispatch(resetCart())
    // localStorage.removeItem("token")
    localStorage.removeItem("adminName")
    toast.success("Logged Out")
    navigate("/")
}
