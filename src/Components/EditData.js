import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom"
import { editEmployee } from "../Services/Operations/EmployeeAPI";
import Navbar from "./Navbar";

export default function EditData() {

    const [selectedCheckbox, setSelectedCheckbox] = useState(null);
    const navigate = useNavigate();
    const [newImage, setNewImage] = useState(null);
    const refImage = useRef(null);
    const [formData, setFormData] = useState({
        _id: "",
        Name: "",
        email: "",
        mobileNumber: "",
        designation: "",
        gender: "",
        course: "",
        image: ""
    })

    useEffect(() => {
        const adminName = localStorage.getItem('adminName')
        if (!adminName) {
            navigate("/")
        }
    })

    useEffect(() => {
        const storageData = localStorage.getItem("editData");
        const res = storageData ? JSON.parse(storageData) : null
        // console.log("edit data", res)
        setFormData({
            ...formData,
            _id: res._id,
            Name: res.name,
            email: res.email,
            mobileNumber: res.mobileNo,
            designation: res.designation,
            gender: res.gender,
            course: res.course,
            image: res.image
        });
        setSelectedCheckbox(res.course);
    }, [])

    const handleCheckboxChange = (event) => {
        setSelectedCheckbox(event.target.value);
    }

    const handleChange = (e) => {
        setFormData((prevData) => {
            return {
                ...prevData,
                [e.target.name]: e.target.value
            }
        })
    }

    const handleImageClick = () => {
        refImage.current.click();
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setNewImage(file);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        formData.course = selectedCheckbox;
        if(newImage) {
            // console.log("exist");
            formData.image = URL.createObjectURL(newImage);
        }        

        // console.log("Form Data - ", formData)
        try {
            await editEmployee(formData, navigate);
            alert("Updated Successfully");
        } catch (error) {
            alert(error.message);
        }
    }
    return (
        <div>
            <section>
                <Navbar />
            </section>



            <form onSubmit={handleSubmit}
                className="w-[40%] mx-auto h-full my-10 border-2 p-3
             rounded-md shadow-lg">
                <p className="text-center text-2xl font-bold mt-2">
                    Update Employee Data
                </p>
                {/* name */}
                <div className="flex flex-col">
                    <label htmlFor="name" className="text-base">
                        Name
                    </label>
                    <input
                        required
                        type="text"
                        name="Name"
                        id="name"
                        placeholder="Enter name"
                        className="inputTag"
                        value={formData.Name}
                        onChange={(e) => handleChange(e)}
                    />
                </div>

                {/* email */}
                <div className="flex flex-col">
                    <label htmlFor="email" className="text-base">
                        Email Address
                    </label>
                    <input
                        required
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Enter email address"
                        className="inputTag"
                        value={formData.email}
                        onChange={(e) => handleChange(e)}
                    />
                </div>
                {/* mibile number */}
                <div className="flex flex-col gap-2">
                    <label htmlFor="mobileNumber" className="text-base">
                        Mobile Number
                    </label>

                    <input
                        required
                        type="number"
                        id="mobileNumber"
                        name="mobileNumber"
                        value={formData.mobileNumber}
                        onChange={(e) => handleChange(e)}
                        placeholder="Enter mobile number"
                        className="inputTag"
                    />
                </div>

                {/* designation */}
                <div className="flex gap-x-4 mt-2 items-center">
                    <label htmlFor="mobileNumber" className="text-base">
                        Designation
                    </label>
                    <select
                        name="designation"
                        id="designation"
                        className="inputTag text-center"
                        value={formData.designation}
                        onChange={(e) => handleChange(e)}
                    >
                        <option value="" disabled >Select</option>
                        <option value="HR">HR</option>
                        <option value="Manager">Manager</option>
                        <option value="Sales">Sales</option>
                    </select>
                </div>

                {/* gender */}
                <div className=" mt-3 flex gap-x-4 items-center">
                    <label htmlFor="gender" className="text-base">
                        Gender
                    </label>
                    <div className="flex gap-x-3">
                        <div className="flex gap-x-2 items-center">
                            <input type="radio" value="M" name="gender"
                                checked={formData.gender === 'M'}
                                onChange={(e) => handleChange(e)}
                            />
                            <p>M</p>
                        </div>

                        <div className="flex gap-x-2 items-center">
                            <input type="radio" value="F" name="gender"
                                checked={formData.gender === 'F'}
                                onChange={(e) => handleChange(e)}
                            />
                            <p>F</p>
                        </div>
                    </div>

                </div>

                {/* course */}
                <div className=" mt-3 flex gap-x-4 items-center">
                    <label className="">
                        Course
                    </label>
                    <div className="flex gap-x-4  items-center">
                        <div className="flex gap-x-2  items-center">
                            <input type="checkbox" value="MCA" name="course"
                                className="cursor-pointer"
                                checked={selectedCheckbox === 'MCA'}
                                onChange={(e) => handleCheckboxChange(e)}
                            />
                            <p>MCA</p>
                        </div>
                        <div className="flex gap-x-2 items-center">
                            <input type="checkbox" value="BCA" id="c1" name="course"
                                className="cursor-pointer"
                                checked={selectedCheckbox === 'BCA'}
                                onChange={(e) => handleCheckboxChange(e)}
                            />
                            <p>BCA</p>
                        </div>
                        <div className="flex gap-x-2  items-center">
                            <input type="checkbox" value="BSC" id="c1" name="course"
                                className="cursor-pointer"
                                checked={selectedCheckbox === 'BSC'}
                                onChange={(e) => handleCheckboxChange(e)}
                            />
                            <p>BSC</p>
                        </div>
                    </div>
                </div>

                {/*  image  */}
                <div onClick={handleImageClick}
                    className="flex gap-x-2 mt-2 items-center ">
                    {newImage ?
                        <img src={URL.createObjectURL(newImage)} alt="picture"
                            className="w-24" />
                        : <img src={formData.image} className="w-24"
                            alt="picture" />}

                    <input type="file"
                        ref={refImage}
                        accept="image/png, image/jpeg"
                        className="hidden"
                        onChange={(e) => handleImageChange(e)}
                    />
                </div>

                <button
                    type="submit"
                    className="px-6 py-2 bg-blue-500 text-lg rounded-md
                    flex justify-center items-center mt-4 mx-auto
                    text-white">
                    Update
                </button>
            </form >

        </div>
    )
}