import { useRef, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { setStatus } from "../store/tabSlice"

const Resume = () => {
    const data = useSelector((state) => state.main.users)
    const educationData = useSelector((state) => state.education)
    const skillData = useSelector((state) => state.skill)
    const interests = useSelector((state) => state.interest)
    const experience = useSelector((state) => state.experience)
    const projects = useSelector((state) => state.projects)
    const summary = useSelector((state) => state.summary)
    const additional = useSelector((state) => state.additional)

    const [printed, setPrinted] = useState(false)

    const resumePDF = useRef()

    const dispatch = useDispatch()

    const handlePrint = () => {
        setPrinted(true)
        dispatch(setStatus(true))
        setTimeout(() => {
            window.print()
            
        }, 1000)
        setTimeout(() => {
            setPrinted(false)
            dispatch(setStatus(false))
        }, 2000)
    }
    
    return (
        <div  ref={resumePDF} className="w-[8.5in] h-[10.1in]  mx-auto    ">
            <div className="grid gap-3 px-5 py-3">
                {
                    data.length > 0 &&
                    <div>
                        {
                            data.map(({ name, email, phone, address }, i) => {
                                return (
                                    <div key={i} className="grid gap-0.5 text-center">
                                        <p className="uppercase text-center font-semibold text-2xl">{name}</p>
                                        <p className="text-sm">{address}</p>
                                        <span className="flex text-sm justify-center items-center gap-2"><p>{phone}</p> <p>|</p> <p> {email} </p></span>
                                        {
                                            additional.map(({ github, linkedin }, i) => {
                                                return (
                                                    <div key={i} className="flex justify-center gap-2 text-sm">
                                                        <p>{github}</p>
                                                        <p>|</p>
                                                        <p>{linkedin}</p>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                )
                            })
                        }

                    </div>
                }
                {
                    summary !== "" &&
                    <div>
                        <p className="bg-slate-200 p-1.5 text-lg rounded font-bold">Summary</p>
                        <p className="py-1 px-2">{summary}</p>
                    </div>
                }


                {
                    experience.length > 0 &&
                    <div >
                        <p className="bg-slate-200 p-1.5 text-lg rounded font-bold">Experience</p>
                        <div className="flex items-center gap-5">
                            {
                                experience.map((e, i) => {
                                    return (
                                        <div key={i} className="grid p-2">
                                            <span className="font-semibold flex items-center gap-1"> <p className="text-[8px]"> ⚫</p> {e.position}</span>
                                            <span>Company : {e.company}</span>
                                            <p>Description : {e.description}</p>
                                            <p>Start Date : {e.startDate}</p>
                                            <p>End Date :  {e.endDate}</p>
                                        </div>
                                    )
                                })
                            }</div>
                    </div>
                }

                {
                    educationData.length > 0 &&
                    <div>
                        <p className="bg-slate-200 p-1.5 text-lg rounded font-bold">Education</p>

                        {
                            educationData.map(({ degree, university, percentage, passingYear }, i) => {
                                return (
                                    <div key={i} className="p-2 grid">
                                        <span className="font-semibold flex items-center gap-1"> <p className="text-[8px]"> ⚫</p> {university}</span>
                                        <span>{degree}</span>
                                        <span>Percenrage : {percentage}%</span>
                                        <span>Passing Year : {passingYear}</span>
                                    </div>
                                )
                            })
                        }

                    </div>
                }

                {
                    projects.length > 0 &&
                    <div>
                        <p className="bg-slate-200 p-1.5 text-lg rounded font-bold">Projects</p>
                        {
                            projects.map(({ title, description, technologies }, i) => {
                                return (
                                    <div key={i} className="grid p-2">
                                        <span className="font-semibold flex items-center gap-1"> <p className="text-[8px]"> ⚫</p> {title}</span>
                                        <span>Description : {description}</span>
                                        <span>Technologies  : {technologies}</span>

                                    </div>
                                )
                            })
                        }
                    </div>
                }

                {
                    skillData.length > 0 &&
                    <div >

                        <p className="bg-slate-200 p-1.5 text-lg rounded font-bold">Skills</p>
                        <div className="flex p-2">
                            {
                                skillData.map((skill, i) => {
                                    return (
                                        <div key={i} className="px-1">
                                            <p>{skill}{i < skillData.length - 1 && ','}</p>
                                        </div>
                                    )
                                })
                            }</div>
                    </div>
                }

                {
                    interests.length > 0 &&
                    <div>
                        <p className="bg-slate-200 p-1.5 text-lg rounded font-bold">Interests</p>
                        <div className="flex items-center p-2">

                            {
                                interests.map((interest, i) => {
                                    return (
                                        <div key={i} className="px-1">
                                            <p>{interest} {i < interests.length - 1 && ','}</p>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                }


             <button className={`bg-green-500 py-1 text-white ${printed ? 'hidden' : 'block'}`} onClick={() => handlePrint()}>Download</button> 
                
            </div>

        </div>
    )
}

export default Resume