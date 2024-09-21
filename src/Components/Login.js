import { Link, useNavigate } from "react-router-dom";
import { login } from "../Services/Operations/Auth_API";
import { useState } from "react";

export default function Login() {

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })
    const { email, password } = formData;

    const handleOnChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }))
    }

    const loginHandler = (e) => {
        e.preventDefault()
        login(email, password, navigate);
    }


    return (
        <div className="w-[40%] mx-auto h-full my-20 border-2 p-3
        rounded-md shadow-lg">
            <p className="text-center text-2xl font-bold mt-2">Login</p>
            <form onSubmit={loginHandler}>
                {/* user name field */}
                <label className="text-base">
                    <p>
                        User Name
                    </p>
                    <input
                        required
                        type="email"
                        name="email"
                        value={email}
                        onChange={handleOnChange}
                        placeholder="Enter User Name"
                        className="inputTag"
                    // w-full border border-blue-200 p-2 rounded-md

                    />
                </label>

                <label>
                    <p className="text-base"> Password</p>
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

                <button type="submit"
                    className="px-6 py-2 bg-blue-500 text-lg rounded-md
                flex justify-center items-center mt-4 mx-auto
                text-white">
                    Login
                </button>
            </form>

            {/* create an account */}
            <Link to="/signin"
                className="px-6 py-2 bg-blue-500 text-lg rounded-md
            flex justify-center items-center mt-4 mx-auto
            text-white mb-2"
            >
                Create An Account
            </Link>

        </div>
    )
}