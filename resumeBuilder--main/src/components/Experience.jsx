import { useEffect, useRef, useState } from "react"
import { addExperience, removeExperience } from "../store/experienceSlice"
import { useDispatch, useSelector } from "react-redux"
import { nanoid } from "@reduxjs/toolkit";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setTabCounter } from "../store/tabCounterSlice";


const Experience = () => {

    const dispatch = useDispatch();
    const storeData = useSelector((state) => state.experience)
    const defaultData = { id: nanoid(), company: '', position: '', description: '', startDate: '', endDate: '', }
    const notify = () => toast("your data saved , you can move");

    const inputD = useRef()
    const inputCheck = useRef()
    const [isCurrent, setIsCurrent] = useState(false)

    const [data, setData] = useState(defaultData)

    const handleInput = (e) => {

        setData({ ...data, [e.target.name]: e.target.value })
    }

    const { company, position, description } = data;
    const isFormValid = () => company !== "" && position !== "" && description !== "" 

    const handleAdd = () => {
        if (isFormValid()) {

            dispatch(addExperience(data))
            setIsCurrent(false)
            setData(defaultData)
            inputD.current.focus();
            notify()
        } else {
            alert("Please fill up all details")
            inputD.current.focus();
        }

    }
    const handleRemove = (id) => {
        dispatch(removeExperience(id))
    }
    const handleCheckBox = () => {
        setData({
            ...data,
            endDate: !isCurrent && 'currently working'
        });

        setIsCurrent(!isCurrent);
    };
    useEffect(() => {
        data.endDate
    }, [data])

    const counter = useSelector((state)=>state.tabCounter)
    const handleSave = ()=>{
        dispatch(setTabCounter(counter+1))
    }
    return (
        <div className="grid md:justify-around m-5 md:flex items-center">

            <div className="md:w-96 m-1 grid gap-3">
                <h1 className="font-bold text-center text-xl py-5">Experience</h1>

                <input
                    className="border border-black ps-5 py-1 rounded"
                    type="text"
                    placeholder="Company Name *"
                    onChange={handleInput}
                    value={data.company}
                    name="company"
                    ref={inputD}
                />

                <input
                    className="border border-black ps-5 py-1 rounded"
                    type="text"
                    placeholder="Position *"
                    onChange={handleInput}
                    value={data.position}
                    name="position"
                />

                <textarea
                    name="description"
                    cols="10"
                    rows="5"
                    className="border border-black rounded ps-5 py-1"
                    placeholder="Job Description *"
                    value={data.description}
                    onChange={handleInput}
                />
                <div className="grid md:flex items-center gap-3 text-center justify-center">
                    <div>
                        <p>From </p>
                        <input
                            className="border border-black ps-5 py-1 rounded"
                            type="date"
                            placeholder="Position *"
                            onChange={handleInput}
                            value={data.startDate}
                            name="startDate"
                        />
                    </div>
                    {
                        !isCurrent && (
                            <div>
                                <p>To </p>
                                <input
                                    className="border border-black ps-5 py-1 rounded"
                                    type={isCurrent ? 'text' : 'date'}
                                    placeholder="Position *"
                                    onChange={handleInput}
                                    value={data.endDate}
                                    name="endDate"
                                />
                            </div>
                        )
                    }

                </div>
                <div className="flex items-center gap-3">
                    <input className="cursor-pointer" onChange={handleCheckBox} type="checkbox" id="currentCheckbox" ref={inputCheck} name="current" checked={isCurrent} />
                    <label className="cursor-pointer" htmlFor="currentCheckbox">Currently Working Here</label>
                </div>

                <button onClick={handleAdd} className="bg-sky-400 font-bold py-1 rounded">Add</button>
                {
                    storeData.length > 0 &&
                <button onClick={handleSave}  className="bg-green-400 py-1 text-lg rounded font-bold font-mono">Save & Next</button>
                }

                <ToastContainer />
                <p className="uppercase text-[13px] text-center text-red-500 font-bold ">Click on add button before moving to another tab</p>


            </div>

            {
                storeData.length > 0 &&
                <div className="flex gap-5 justify-center">
                    {
                        storeData.map((e, i) => {
                            return (
                                <div key={i} className="md:w-72 bg-sky-200  m-2 p-5 rounded grid">
                                    <p>Company : {e.company}</p>
                                    <p>Position : {e.position}</p>
                                    <p>Description : {e.description}</p>
                                    <p>Start Date : {e.startDate}</p>

                                    <p>End Date : {e.endDate}</p>

                                    <button onClick={() => handleRemove(e.id)} className="w-full m-auto bg-red-500 rounded my-3 text-white">Delete</button>
                                </div>
                            )
                        })
                    }
                </div>
            }
        </div>
    )
}

export default Experience