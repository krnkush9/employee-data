import { toast } from "react-hot-toast"
import { useState } from "react";
import { signUp } from "../Services/Operations/Auth_API";
import { useNavigate } from "react-router-dom";

export default function Login() {

    const [formData, setFormData] = useState({
        userName: "",
        email: "",
        password: "",
        confirmPassword: ""
    })
    const navigate = useNavigate();
    const { userName, email, password, confirmPassword } = formData;

    const handleOnChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }))
    }

    const signinHandler = (e) => {
        e.preventDefault();

        // console.log("handler running")
        // console.log("password", password)
        // console.log("confirmPassword", confirmPassword)
        if (password !== confirmPassword) {
            alert("Passoword not matched");
            // console.log("Password Not Match")
        } else {
            signUp(userName, email, password, navigate);
        }
    }

    return (
        <div>
            <form onSubmit={signinHandler}
                className="w-[40%] mx-auto h-full my-20 border-2 p-3
            rounded-md shadow-lg">

                <p className="text-center text-2xl font-bold mt-2">
                    Sign in
                </p>
                {/* name */}
                <label className="w-full">
                    <p>
                        Name
                    </p>
                    <input
                        required
                        type="userName"
                        name="userName"
                        value={userName}
                        onChange={handleOnChange}
                        placeholder="Enter Your Name"
                        className="inputTag"
                    />
                </label>
                {/* Email field */}
                <label className="w-full">
                    <p>
                        Email
                    </p>
                    <input
                        required
                        type="email"
                        name="email"
                        value={email}
                        onChange={handleOnChange}
                        placeholder="Enter Email"
                        className="inputTag"
                    />
                </label>
                {/* Password */}
                <label>
                    <p> Password</p>
                    <input
                        required
                        type="password"
                        name="password"
                        value={password}
                        onChange={handleOnChange}
                        placeholder="Enter Password"
                        className="inputTag"
                    />
                </label >

                {/* Confirm Password */}
                <label>
                    <p>Confirm Password</p>
                    <input
                        required
                        type="password"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={handleOnChange}
                        className="inputTag"
                        placeholder="Enter Confirm Password"
                    />
                </label >

                <button type="submit"
                    className="px-6 py-2 bg-blue-500 text-lg rounded-md
                flex justify-center items-center mt-4 mx-auto
                text-white">
                    Sign in
                </button>
            </form>
        </div>
    )
}