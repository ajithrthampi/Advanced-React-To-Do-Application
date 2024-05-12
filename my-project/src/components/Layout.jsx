import React, { useContext } from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'
import { AddModalContext } from '../context/AddModalContext'
import AddModal from './modal/AddModal'

const Layout = () => {
  const {addNewModal, setAddNewModal } = useContext(AddModalContext)

  return (
    <div>

      <div className=' h-screen'>
        <Header />
        <div className='slg:flex  '>
          <div className='  slg:w-[300px]'>
            <Sidebar />
          </div>
          <div className='grow bg-red500 h-[calc(100vh-4rem)] overflow-hidden overflow-y-scroll pb-10 pt-10 slg:px-16 md:px-10 sm:px-8 px-4'>
            <Outlet />
          </div>

        </div>

      </div>

      {
        addNewModal &&
        <AddModal   />
      }
    </div>
  )
}

export default Layout