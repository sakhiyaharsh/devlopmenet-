import { useRef, useState } from "react"
import { educationDataRemove, educationDataStore } from "../store/educationSlice";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { nanoid } from "@reduxjs/toolkit";
import { setTabCounter } from "../store/tabCounterSlice";



const EducationData = () => {

    const dispatch = useDispatch();
    const inputD = useRef()

    const storeEducationData = useSelector((state) => state.education)

    const notify = () => toast("your data saved , you can move");

    const [educationData, setEducationData] = useState({ id: nanoid(), degree: '', university: '', passingYear: '', percentage: '' });

    const handleInput = (e) => {
        setEducationData({ ...educationData, [e.target.name]: e.target.value })
    }

    const { degree, passingYear, percentage, university } = educationData;
    const isFormValid = () => degree !== "" && passingYear !== "" && percentage !== "" && university !== "";

    const handleSubmit = () => {

        if (isFormValid()) {
            dispatch(educationDataStore(educationData));
            setEducationData({ id: nanoid(), degree: '', university: '', passingYear: '', percentage: '' });
            notify();
            inputD.current.focus()
        } else {
            alert("please fill all details")
            inputD.current.focus()
        }
    }

    const handleRemove = (id) => {
        dispatch(educationDataRemove(id))
        notify();
    }
    const handleEdit = (id) => {
        const [dataToUpdate] = storeEducationData.filter((state) => state.id === id)
        setEducationData(dataToUpdate)
        dispatch(educationDataRemove(id));
    };

    const counter = useSelector((state) => state.tabCounter)
    const handleSave = () => {
        dispatch(setTabCounter(counter + 1))
    }
    return (
        <div className="grid md:justify-around m-5 md:flex items-center justify-center">
            <div className="md:w-96 m-1 grid gap-3">
                <h1 className="font-bold text-center text-xl py-5">Education Details</h1>
                <input
                    className="border border-black rounded ps-5 py-1"
                    type="text"
                    placeholder="University"
                    onChange={handleInput}
                    name='university'
                    ref={inputD}
                    value={educationData.university}
                />
                <input
                    className="border border-black rounded ps-5 py-1"
                    type="text"
                    placeholder="Enter Degree"
                    onChange={handleInput}
                    name='degree'
                    value={educationData.degree}

                />
                <input
                    className="border border-black rounded ps-5 py-1"
                    type="number"
                    placeholder="Passing Year"
                    onChange={handleInput}
                    name='passingYear'
                    value={educationData.passingYear}

                />
                <input
                    className="border border-black rounded ps-5 py-1"
                    type="number"
                    placeholder="Percentage"
                    onChange={handleInput}
                    name='percentage'
                    value={educationData.percentage}

                />
                <button
                    onClick={handleSubmit} className="bg-sky-400 py-1 text-lg rounded font-bold font-mono">
                    Add
                </button>
                {

                    storeEducationData.length > 0 &&
                    <button onClick={handleSave} className="bg-green-400 py-1 text-lg rounded font-bold font-mono">Save & Next</button>
                }
                <ToastContainer />
                <p className="uppercase text-[13px] text-center text-red-500 font-bold ">Click on add button before moving to another tab</p>
            </div>
            {
                storeEducationData.length > 0 &&

                <div className="flex gap-5 justify-center md:w-[52rem]">
                    {
                        storeEducationData.map((e, i) => {
                            return (
                                <div key={i} className="md:w-72 w-full bg-sky-200   m-2 p-5 rounded grid">
                                    <p>Degree : {e.degree}</p>
                                    <p>University : {e.university}</p>
                                    <p>Marks : {e.percentage}%</p>
                                    <p>Passing year : {e.passingYear}</p>
                                    <div className="flex gap-3">
                                        <button onClick={() => handleRemove(e.id)} className="w-full m-auto bg-red-500 text-white rounded my-3 ">Delete</button>
                                        <button onClick={() => handleEdit(e.id)} className="w-full m-auto bg-green-500 text-white rounded my-3 ">Edit</button>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>

            }
        </div>
    )
}

export default EducationData