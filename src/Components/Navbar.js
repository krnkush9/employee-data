import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../Services/Operations/Auth_API";

export default function Navbar() {
    const dashboardLink = [
        { title: "Home", link: "/dashboard" },
        { title: "Employee List", link: "/employeeList" },
        { title: "Create Employee", link: "/createEmployee" }
    ]

    const [adminName, setAdminName] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const userName = localStorage.getItem('adminName');
        if (userName) {
            setAdminName(userName);
        }
    }, [])




    return (
        <div className="bg-blue-100 p-4">
            {/* navbar */}
            <nav className="flex justify-between items-center">
                <p className="bg-blue-300 rounded-full
                px-6 py-2 font-semibold text-lg select-none
                ">Logo</p>

                {/* links */}
                <div className="flex gap-x-4">
                    {
                        dashboardLink.map((element, i) => {
                            return <Link to={element.link} key={i}
                                className=" text-lg hover:bg-blue-300
                                rounded-md px-2">
                                {element.title}
                            </Link>
                        })
                    }
                </div>

                <div className="flex gap-x-3">
                    {/* user name */}
                    <p className="text-lg font-semibold"
                    >{adminName}</p>

                    {/* logout button */}
                    <button onClick={() => logout(navigate)}
                        className=" text-lg hover:bg-blue-300
                                rounded-md px-2"
                        >
                        Logout
                    </button>
                </div>
            </nav>
        </div>
    )
}