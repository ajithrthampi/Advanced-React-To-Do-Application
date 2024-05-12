import React, { useContext, useState } from 'react'
import { MdOutlineNotificationsActive } from 'react-icons/md'
import { TiTick } from 'react-icons/ti'
import { TaskDataContext } from '../../context/TaskDataContext'
import { BsThreeDots } from 'react-icons/bs'
import { AddModalContext } from '../../context/AddModalContext'
import EditModal from '../modal/EditModal'

const Active = () => {
  const [showData, setShowData] = useState()
  const [index, setIndex] = useState(0)
  const { alltaskData, setAllTaskData } = useContext(TaskDataContext)
  const { setEditModal, editModal } = useContext(AddModalContext)

  const handleEditModal = (item, index) => {
    setEditModal(!editModal)
    setShowData(item)
    setIndex(index)
  }

  console.log("alltaskData", alltaskData);

  return (
    <div className=' '>
      <section className='pt-10 flex md:flex-row flex-col gap-10 '>
        <div className='grow'>
          <div className='flex sm:flex-row flexcol justify-between sm:items-center gap-5'>
            <h1 className='lexend-medium md:text-2xl sm:text-xl text-lg grow w-full'>Active Tasks</h1>
          </div>
          <div className='pt-7'>
            <ul>
              <li className='w-full flex flex-col sm:gap-5 gap-3 relative'>
                {/* {
                  alltaskData[0]?.status === "Completed" ? */}
                    <>
                      {alltaskData?.map((item, index) => item.status === "Active" && (
                        <div className='lexend-regular w-full border h-16 rounded-xl p-3 flex items-center justify-between pl-6 shadow-md ' key={index}>
                          {item.title}
                          <div className='cursor-pointer hover:scale-105' onClick={() => handleEditModal(item, index)}>
                            <BsThreeDots size={25} />
                          </div>
                        </div>
                      ))
                      }
                      <EditModal showData={showData} index={index} />
                    </>
                    {/* :
                    <div className='text-3xl lexend-medium flex justify-center'>
                      No Active task
                    </div>
                } */}
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Active