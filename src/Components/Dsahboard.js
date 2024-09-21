import { useEffect } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {

    const navigate = useNavigate();

    useEffect(() => {
        const adminName = localStorage.getItem('adminName')
        if (!adminName) {
            navigate("/")
        }
    })

    return (
        <div className="w-full">
            {/* navbar */}
            <section>
                <Navbar />
            </section>
            <p className="text-left text-2xl font-semibold
            pl-4 pt-4 underline">Dashboard</p>

            <p className="text-3xl text-center font-semibold mt-24
             ">
                Welcome Admin Panel
            </p>
        </div>
    )
}