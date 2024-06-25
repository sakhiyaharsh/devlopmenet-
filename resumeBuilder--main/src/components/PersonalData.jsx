import { useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { personalData, removeData } from "../store/mainSlice";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { nanoid } from "@reduxjs/toolkit";
import { setTabCounter } from "../store/tabCounterSlice";

const PersonalData = () => {
    const defaultData = { id: nanoid() , username: '', phone: '', email: '', address: '', key: false }

    const [data, setData] = useState(defaultData);
    const notify = () => toast("your data saved , you can move");
    const inputD = useRef()
    const dispatch = useDispatch();

    const userData = useSelector((state) => state.main.users)

    const handleInput = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const { username, phone, email, address } = data;
    const isFormValid = () => username !== "" && phone !== "" && email !== "" && address !== "";

    const counter = useSelector((state)=>state.tabCounter)

    const handleSubmit = () => {
        if (isFormValid()) {
            dispatch(personalData(data));
            notify();
            setData(defaultData)
            dispatch(setTabCounter(counter+1))
        } else {
            alert("Please Fill All Details")
            inputD.current.focus()
        }
    };

    const handleEdit = () => {
        const [data] = userData;
        setData({ username: data.name, phone: data.phone, email: data.email, address: data.address, key: true })
    }

    const handleRemove = ()=>{
        dispatch(removeData({users:[]}))
    }
    return (
        <div>
            <div className="m-5 grid md:flex items-center justify-around">
                <div className="grid gap-2 md:w-96 ">
                    <h1 className="font-bold text-center text-xl py-5">Personal Details</h1>

                    <input className="border border-black rounded ps-5 py-1"
                        type="text"
                        autoComplete="off"
                        name="username"
                        onChange={handleInput}
                        placeholder="Enter Name *"
                        value={data.username}
                        ref={inputD}
                        required="" />

                    <input className="border border-black rounded ps-5 py-1"
                        type="text"
                        autoComplete="off"
                        name="email"
                        onChange={handleInput}
                        placeholder="Enter Email *"
                        value={data.email}
                        required />

                    <input className="border border-black rounded ps-5 py-1"
                        type="number"
                        autoComplete="off"
                        name="phone"
                        onChange={handleInput}
                        placeholder="Enter Phone *"
                        value={data.phone}
                        required />

                    <textarea
                        name="address"
                        cols="10"
                        rows="5" className="border border-black rounded ps-5 py-1"
                        placeholder="Enter Address *"
                        value={data.address}
                        onChange={handleInput} />

                    <button
                        onClick={handleSubmit} className="bg-sky-400 py-1 text-lg rounded font-bold font-mono">
                        {data.key ? 'Update' : 'Save & Next'}
                    </button>
                    <ToastContainer />
                    <p className="uppercase text-[13px] text-center text-red-500 font-bold ">Click on add button before moving to another tab</p>
                </div>


                {
                    userData.length > 0 &&
                    userData.map(({id, name, phone, email, address }, i) => {
                        return (
                            <div key={i} className="md:w-96 my-2 md:my-0 rounded-xl p-3 bg-sky-200" >
                                <p>Name : {name}</p>
                                <p>Phone : {phone}</p>
                                <p>Email : {email}</p>
                                <p>Address : {address}</p>
                                <div className="flex gap-3">
                                <button onClick={handleEdit} className="bg-green-500 px-5 py-1 text-white rounded w-full my-2">Edit</button>
                                <button onClick={()=>handleRemove(id)} className="bg-red-500 px-5 py-1 text-white rounded w-full my-2">Delete</button>
                                </div>
                            </div>
                        )
                    })

                }

            </div>




        </div>
    )
}

export default PersonalData