import { nanoid } from "@reduxjs/toolkit";
import { useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { addProject, removeProject } from "../store/projectsSlice";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setTabCounter } from "../store/tabCounterSlice";

const Projects = () => {
    const dispatch = useDispatch();
    const storeData = useSelector((state) => state.projects)
    const notify = () => toast("your data saved , you can move");

    const inputD = useRef()

    const defaultData = { id: nanoid(), title: '', description: '', technologies: '' };

    const [data, setData] = useState(defaultData);

    const handleInput = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }
    const { title, description, technologies } = data
    const isFormValid = () => title !== "" && description !== "" && technologies !== "";

    const handleAdd = () => {
        if (isFormValid()) {
            dispatch(addProject(data))
            setData(defaultData)
            notify()
        } else {
            alert("Please fill up all data")
            inputD.current.focus()
        }
    }

    const handleRemove = (id) => {
        dispatch(removeProject(id))
    }
    const counter = useSelector((state)=>state.tabCounter)
    const handleSave = ()=>{
        dispatch(setTabCounter(counter+1))
    }
    return (
        <div className="grid md:justify-around m-5 md:flex items-center justify-center">
            <div className="grid gap-3 md:w-96 m-auto py-5">
                <h1 className="font-bold text-center text-xl py-5">Projects</h1>

                <input
                    className="border border-black ps-5 py-1 rounded"
                    type="text"
                    name='title'
                    placeholder="Project Name *"
                    onChange={handleInput}
                    value={data.title}
                    ref={inputD}
                />
                <textarea
                    rows={4}
                    className="border border-black ps-5 py-1 rounded"
                    type="text"
                    name='description'
                    placeholder="Description *"
                    onChange={handleInput}
                    value={data.description}
                />
                <textarea
                    rows={2}
                    className="border border-black ps-5 py-1 rounded"
                    type="text"
                    name='technologies'
                    placeholder="Technologies used *"
                    onChange={handleInput}
                    value={data.technologies}
                />
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
                <div className="flex gap-5 flex-wrap justify-center md:w-[52rem]">
                    {
                        storeData.map((e, i) => {
                            return (
                                <div key={i} className="md:w-72 w-full bg-sky-200 break-words m-auto p-5 rounded ">
                                    <p>Title : {e.title}</p>
                                    <p>Technologies : {e.technologies}</p>
                                    <p >Description : {e.description}</p>

                                    <button onClick={() => handleRemove(e.id)} className="w-full m-auto bg-red-500 text-white rounded my-3 ">Delete</button>
                                </div>
                            )
                        })
                    }
                </div>
            }

        </div>

    )
}

export default Projects