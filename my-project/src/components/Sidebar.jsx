import React, { useContext, useEffect, useState } from 'react'
import { sidebarData } from '../utils/data'
import { useNavigate } from 'react-router-dom'
import AddModal from './modal/AddModal'
import { AddModalContext } from '../context/AddModalContext'
import { RouteContext } from '../context/RouteContext'

const Sidebar = () => {
    const [readValue, setReadValue] = useState("Dasboard")
    const [showoption, setShowOption] = useState(false)
    const { addNewModal, setAddNewModal, setEditModal, editModal } = useContext(AddModalContext)
    const { routevalue, setRouteValue } = useContext(RouteContext)


    const navigate = useNavigate()
    const handlenNav = (e) => {
        if (e === "Dashboard") {
            navigate("/dashboard")
        } else if (e === "Active") {
            navigate("/active")
        } else if (e === "Completed") {
            navigate("/completed")
        }
        setReadValue(e)
        setEditModal(false)

        localStorage.setItem("route", e)
    }

    useEffect(() => {
        const data = localStorage.getItem("route")
     
        setReadValue(data)
        setRouteValue(data)
    }, [readValue])

    return (
        <>
            <div className=' bg-green500 h-[calc(100vh-4rem)] pt-10 slg:block hidden'>
                <section className='px-7 flex justify-center items-center '>
                    <button className=' shadow-md px-6 border border-gray-100 flex flex-row gap-7 py-3  lexend-regular rounded-lg' onClick={() => setAddNewModal(!addNewModal)}>
                        Add Task
                        <span className='w-6 h-6 rounded-full bg-[#BA5112] text-white'>+</span>
                    </button>
                </section>

                <section className='pt-14'>
                    <ul className='lexend-regular flex flex-col justify-center items-center gap-7 '>
                        {
                            sidebarData.map((item, index) => (
                                <li className={`hover:bg-[#EDB046] w-full flex justify-center items-center  h-10 cursor-pointer ${item === readValue ? "bg-[#EDB046]" : ""}`} onClick={() => handlenNav(item)} key={index}>{item}</li>
                            ))
                        }
                    </ul>
                </section>
            </div>

            <div className='slg:hidden md:px-10 px-8'>
                <section className='flex  '>
                    <button className=' shadow-md slg:px-6 px-3 border border-gray-100 flex flex-row slg:gap-7 gap-4 slg:py-3 py-2  lexend-regular rounded-lg slg:text-base text-sm' onClick={() => setAddNewModal(!addNewModal)}>
                        Add Task
                        <span className='slg:w-6 slg:h-6 w-5 h-5 rounded-full bg-[#BA5112] text-white'>+</span>
                    </button>
                </section>

                <div className='h-10 mt-5 max-w-screen w-full border rounded-lg flex items-center cursor-pointer  relative bg-[#EDB046]' onClick={() => setShowOption(!showoption)} >
                    <p className='lexend-regular pl-5 bg-[#EDB046]'>{readValue}</p>
                    {
                        showoption ? <div className='w-full  h-32 bg-white shadow absolute top-10 border z-50'>
                            {
                                sidebarData.map((item, index) => (
                                    <div className='hover:bg-[#EDB046] lexend-regular w-full flex flex-col justify-center pl-5  h-10 cursor-pointer' onClick={() => handlenNav(item)} key={index}>
                                        {item}
                                    </div>
                                ))
                            }
                        </div> : ""
                    }
                </div>
            </div>
        </>
    )
}

export default Sidebar