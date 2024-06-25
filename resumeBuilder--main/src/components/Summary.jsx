import { useRef, useState } from "react"
import { addSummary, removeSummary } from "../store/summrySlice"
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setTabCounter } from "../store/tabCounterSlice";

const Summary = () => {

  const [data, setData] = useState('');
  const dispatch = useDispatch()
  const inputD = useRef()
  const notify = () => toast("your data saved , you can move");
  const storeData = useSelector((state) => state.summary)

  const handleInput = (e) => {
    setData(e.target.value)
  }
  const counter = useSelector((state)=>state.tabCounter)

  const handleAdd = () => {
    if (data !== "") {
      dispatch(addSummary(data))
      setData('')
      inputD.current.focus()
      notify()
      dispatch(setTabCounter(counter+1))

    }
    else {
      alert("Enter some data")
      inputD.current.focus()

    }
  }

  const handleEdit = () => {
    setData(storeData)
  }

  const handleRemove = () => {
    setData("")
    dispatch(removeSummary(data))
  }

  return (
    <div className="grid md:flex items-center w-full justify-around">
      <div className="grid md:w-96 md:m-auto gap-2 py-2 m-3">
        <h1 className="font-bold text-center text-xl py-5">Profile Summary</h1>
        <textarea
          rows={5}
          cols={40}
          className="border border-black ps-5 rounded py-1 "
          type="text"
          placeholder="Type Summary Here"
          name="summary"
          onChange={handleInput}
          value={data}
          ref={inputD}
        />
        <button onClick={handleAdd} className="bg-sky-400 py-1 rounded font-semibold">Save & Next</button>
        <ToastContainer />
        <p className="uppercase text-[13px] text-center text-red-500 font-bold ">Click on add button before moving to another tab</p>
      </div>

      {
        storeData !== "" &&
        <div className="md:w-96 w-full  m-auto">


          <div className=" rounded-xl p-3 m-3 bg-sky-200" >
            <p>Summary : {storeData}</p>
            <div className="flex gap-3">
              <button onClick={handleEdit} className="bg-green-500 px-5 py-1 text-white rounded w-full my-2">Edit</button>
              <button onClick={handleRemove} className="bg-red-500 px-5 py-1 text-white rounded w-full my-2">Remove</button>
            </div>
          </div>

        </div>
      }
    </div>
  )
}

export default Summary