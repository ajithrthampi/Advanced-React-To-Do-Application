import React, { useContext, useState } from 'react'
import { AddModalContext } from '../../context/AddModalContext'
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoClose } from "react-icons/io5";
import { IoIosCloseCircle } from "react-icons/io";
import { TaskDataContext } from '../../context/TaskDataContext';
import { useLocation } from 'react-router-dom';




const EditModal = ({ showData, index }) => {
    const [status, setStatus] = useState()
    const [open, setOpen] = useState(false)
    const { setEditModal, editModal } = useContext(AddModalContext)
    const { alltaskData, setAllTaskData } = useContext(TaskDataContext)
    const location = useLocation()

    // console.log("alltaskData",alltaskData);

    const handleDelete = (taskindex) => {
        const newTasks = alltaskData.filter((task, index) => index !== taskindex)
        console.log(newTasks);
        setAllTaskData(newTasks)
        setEditModal(false)
        // setEditModal(true)
    }

    const handleShow = (e) => {
        setOpen(!open)
    }

    //update Status to complete
    const handleChnageStatus = (val) => {
        const updatedTasks = alltaskData.map((task, idx) => {
            if (idx === index) {
                return { ...task, status: val };
            }
            return task;
        });
        setOpen(false)
        setAllTaskData(updatedTasks);
        setEditModal(false)
    }



    return (
        <div className='absolute right-0 top-20  '>
            {
                editModal ? <div className=''>
                    <div className='md:w-[400px] sm:w-[300px] w-[290px] max-w-lg   border rounded-lg bg-[#EDB046] p-5 pt-10  '>
                        <div className='flex'>
                            <h3 className='lexend-bold  text-xl'>{showData?.title}</h3>
                            <p className='lexend-bold  text-xl '>{showData?.data}</p>
                        </div>
                        <div className='pt-6'>
                            <p className='lexend-medium '>Description</p>
                            <p className='lexend-regular text-sm pt-2'>{showData?.description}</p>
                        </div>

                        <div className='absolute top-2 right-3 cursor-pointer' onClick={() => setEditModal(false)}>
                            <IoIosCloseCircle size={26} />

                        </div>
                        {
                            location.pathname !== "/completed" &&

                            <div className='flex justify-between'>
                                <div className='pt-6 flex justify-end lexend-regular' >
                                    Edit
                                    <div className='  bg-white px-8 rounded-md ml-2 relative text-sm cursor-pointer' onClick={handleShow}>
                                        <p className=''>{showData?.status}</p>
                                        {
                                            open && showData?.status === "Active" &&
                                            <div className='w-full bg-white border-b absolute top-6 left-0 rounded-md pl-2 lexend-regular cursor-pointer' onClick={() => handleChnageStatus("Completed")}>
                                                Completed
                                            </div>
                                        }
                                    </div>
                                </div>
                                <div className='pt-6 flex justify-end' onClick={() => handleDelete(index)}>
                                    <RiDeleteBin6Line size={24} />
                                </div>
                            </div>
                        }
                    </div>
                </div>
                    :
                    <>
                    </>
            }
        </div>
    )
}

export default EditModal