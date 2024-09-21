import { useEffect, useState } from "react";
import { deleteEmployeeData, getEmployeeList } from "../Services/Operations/EmployeeAPI";
import Navbar from "./Navbar";
import { Link, useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import { format } from 'date-fns';

export default function EmployeeList() {

    const [employeeList, setEmployeeList] = useState([]);
    const [search, setSearch] = useState("");
    const [filteredData, setFilteredData] = useState([]);
    const [reloadPage, setReloadPage] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEmployeeList = async () => {
            const response = await getEmployeeList();
            // console.log("emp list", response);
            setEmployeeList(response);
            setFilteredData(response);
        }

        fetchEmployeeList();
    }, [reloadPage])

    useEffect(() => {
        const adminName = localStorage.getItem('adminName')
        if (!adminName) {
            navigate("/")
        }
    })

    useEffect(() => {
        // console.log("search>>", search);
        const result = employeeList.filter(data => {
            return data.name.toLowerCase().match(search.toLowerCase());
        })
        // console.log("result >> ", result);
        setFilteredData(result);
    }, [search])

    // , selector: (row) => row.
    const columns = [
        {
            name: "ID",
            selector: (row) => row._id,
            width: "16rem"
        },
        { name: "Image", selector: (row) => <img src={row.image} 
        className="w-24 h-auto"/>|| null },
        { name: "Name", selector: (row) => row.name, sortable: true,  width: "12rem" },
        { name: "Email", selector: (row) => row.email,  width: "16rem" },
        { name: "Mobile No", selector: (row) => row.mobileNo, width: "7.5rem"  },
        { name: "Designation", selector: (row) => row.designation, width: "7.5rem"  },
        { name: "Gender", selector: (row) => row.gender, width: "6rem" },
        { name: "Course", selector: (row) => row.course, width: "8.9rem" },
        {
            name: "Created At",
            selector: (row) => format(row.createdAt, 'dd-MMM-yyyy'),
            sortable: true,
            width: "9rem"
        },
        {
            width: "10rem",
            name: "Action", cell: (row) =>
                <div className="flex gap-x-3">
                    {/* edit */}
                    <button onClick={() => {
                        localStorage.setItem("editData", JSON.stringify(row))
                        navigate("/edit");
                    }}
                        className="bg-blue-300 px-2 rounded-md py-1">
                        Edit
                    </button>
                    {/* delete */}
                    <button
                        className="bg-blue-300 px-2 rounded-md py-1"
                        onClick={() => {
                            deleteEmployeeData(row._id)
                            setReloadPage((prev) => !prev)
                        }}>
                        Delete
                    </button>
                </div>
        },
    ]

    const customStyle = {
        rows: {
            style: {
                fontSize: "1rem"
            }
        },
        headCells: {
            style: {
                fontSize: "1rem"
            }
        },
        cells: {
            style: {
                borderStyle: "solid",
                borderWidth: "0.01rem"
            }
        },

    }

    return (
        <div>
            <section>
                <Navbar />
            </section>

            <div className="flex justify-between p-2">
                <p className="text-center text-2xl font-bold mt-2">Employee List</p>

                <div className="flex gap-x-4 text-lg items-center">
                    <p className="text-lg font-semibold">Total: {employeeList.length}</p>

                    <Link to="/createEmployee"
                        className="px-6 py-2 bg-blue-500 rounded-md
                        flex justify-center items-center text-white">
                        Create Employee
                    </Link>
                </div>
            </div>
            {/* employee data table */}
            <div className="">
                <DataTable
                    columns={columns}
                    data={filteredData}
                    pagination
                    fixedHeader
                    highlightOnHover
                    subHeader
                    subHeaderComponent={
                        <input
                            type="text"
                            placeholder="Search by name"
                            value={search}
                            className="border border-blue-400 p-2 rounded-md"
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    }
                    customStyles={customStyle}
                />
            </div>
        </div>
    )
}