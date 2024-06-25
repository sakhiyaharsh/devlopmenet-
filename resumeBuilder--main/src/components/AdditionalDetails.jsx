
import { useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { addAdditionalData, removeAdditionalData } from "../store/additionalSlice";
import { nanoid } from "@reduxjs/toolkit";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setTabCounter } from "../store/tabCounterSlice";


const AdditionalDetails = () => {
    const [lang, setLang] = useState('');
    const dispatch = useDispatch()
    const inputD = useRef()
    const storeData = useSelector((state) => state.additional)

    const [multLang, setMultLang] = useState([]);
    const defaultData = { id: nanoid(), github: '', linkedin: '', language: [...multLang] }

    const [data, setData] = useState(defaultData);

    const handleInput = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    }

    const handleLang = (e) => {
        setLang(e.target.value);
    }

    const addLang = () => {
        if (lang.trim() !== '') {
            setMultLang([...multLang, lang]);
            setLang('');
        }
    }

    const removeLang = (index) => {
        const updatedLanguages = [...multLang];
        updatedLanguages.splice(index, 1);
        setMultLang(updatedLanguages);
    }
    const notify = () => toast("your data saved , you can move");

    const { github, linkedin } = data
    const isFormValid = () => github !== "" && linkedin !== ""
    const counter = useSelector((state)=>state.tabCounter)

    const handleSubmit = () => {
        if (isFormValid()) {
            const updatedData = { ...data, language: [...multLang] }
            setData(updatedData)
            dispatch(addAdditionalData(updatedData))
            setData(defaultData)
            setMultLang([])
            notify()
            dispatch(setTabCounter(counter+1))

        } else {
            alert("Please fill up all details")
            inputD.current.focus()
        }
    }

    const handleEdit = () => {
        const [data] = storeData;
        setData(data)
        setMultLang(data.language)
    }
    const handleDelete = (id) => {
        dispatch(removeAdditionalData(id))
    }
    return (
        <div className="grid md:flex md:items-center mx-3 md:justify-around ">

            <div className="grid md:w-96   m-5 py-2 gap-3">

                <h1 className="font-bold text-center text-xl py-5">Additional Details</h1>

                <input
                    className="ps-5 py-1 border border-black rounded"
                    type="text"
                    placeholder="Github link"
                    name="github"
                    value={data.github}
                    ref={inputD}
                    onChange={handleInput}
                />

                <input
                    className="ps-5 py-1 border border-black rounded"
                    type="text"
                    placeholder="Linkedin link"
                    name="linkedin"
                    value={data.linkedin}
                    onChange={handleInput}
                />

                <div className="border border-black rounded flex items-center justify-between px-5">
                    <input className=" py-1 outline-none w-full" type="text" placeholder="languages" value={lang} onChange={handleLang} />
                    <button onClick={addLang} className="bg-slate-300 px-3 rounded-md">Add </button>
                </div>
                {
                    multLang.length > 0 &&
                    <div className="flex flex-wrap items-center gap-3 px-5">
                        {
                            multLang.map((e, i) => {
                                return (
                                    <div key={i}>
                                        <span className="flex items-center gap-3 bg-emerald-200 px-2 py-0.5 rounded-md"> <p>{e}</p> <button onClick={() => removeLang(i)} className="text-red-500 text-xl font-semibold">x</button> </span>
                                    </div>
                                )
                            })
                        }
                    </div>
                }
                <button onClick={handleSubmit} className="bg-sky-400 py-1 rounded font-semibold">Save & Next</button>
                <p className="uppercase text-[13px] text-center text-red-500 font-bold ">Click on add button before moving to another tab</p>
                <ToastContainer />
            </div>
            <div>

                {
                    storeData.length > 0 &&
                    <div className="bg-sky-200 md:w-96 p-5 rounded-md md:m-0 m-5 break-words">
                        {
                            storeData.map((e, i) => {
                                return (
                                    <div key={i} className="grid gap-2" >
                                        <p className="bg-slate-200 rounded-md p-1">{e.github}</p>
                                        <p className="bg-slate-200 p-1 rounded-md">{e.linkedin}</p>
                                        <span className="flex gap-3 flex-wrap break-words">
                                            <p>Languages : </p>
                                            {
                                                e.language.map((e, i) => {
                                                    return (
                                                        <div key={i}>
                                                            <p className="bg-slate-200 px-3 rounded-md">{e}</p>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </span>
                                        <div className="flex items-center gap-3">
                                            <button className="bg-green-400 w-full py-1 rounded mt-2" onClick={handleEdit}>Edit</button>
                                            <button className="bg-red-500 text-white w-full py-1 rounded mt-2" onClick={() => handleDelete(e.id)}>Delete</button>
                                        </div>
                                    </div>
                                )
                            })}
                    </div>
                }
            </div>
        </div>
    )
}

export default AdditionalDetails