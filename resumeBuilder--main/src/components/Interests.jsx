import { useState } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { addInterests, removeInterest } from "../store/interestSlice";
import { useRef } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setTabCounter } from "../store/tabCounterSlice";


const Interests = () => {
  const [data, setData] = useState('');
  const dispatch = useDispatch()
  const inputD = useRef()
  const notify = () => toast("your data saved , you can move");

  const storeData = useSelector((state) => state.interest)

  const handleSubmit = () => {
    if (data !== "") {
      dispatch(addInterests(data))
      setData('')
      inputD.current.focus()
      notify()
    }
    else {
      alert("Please enter interests")
      inputD.current.focus()

    }
  }
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit()
    }
  }
  const handleRemove = (interest) => {
    dispatch(removeInterest(interest))
  }
  const counter = useSelector((state) => state.tabCounter)
  const handleSave = () => {
    dispatch(setTabCounter(counter + 1))
  }

  return (
    <div className="md:w-96 w-full justify-center grid gap-3 m-auto py-5">
      <div className="grid  justify-normal md:justify-between md:flex items-center gap-3">
        <input className="border py-1 border-black ps-5 rounded" type="text" onChange={(e) => setData(e.target.value)} ref={inputD} value={data} onKeyDown={handleKeyPress} placeholder="Enter Interests" />
        <button onClick={handleSubmit} className="bg-sky-400  font-semibold px-5 py-1 rounded-xl">Add</button>
        <ToastContainer />
      </div>
      {
        storeData.length > 0 &&
        <button onClick={handleSave} className="bg-green-400 py-1 text-lg rounded font-bold font-mono">Save & Next</button>
      }
      {
        storeData.length > 0 &&
          <div className="flex justify-center flex-wrap gap-3">
            {
              storeData.map((interest, i) => {
                return (
                  <div key={i}>
                    <div className="bg-gradient-to-tl shadow-sm shadow-green-400 from-slate-200 to-gray-400 py-1 w-auto gap-3 flex  justify-between px-2 rounded-md items-center ">
                      <p className="" >{interest}</p>
                      <button onClick={() => handleRemove(interest)} className="text-[16px] text-red-500">X</button>
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

export default Interests