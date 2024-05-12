import React, { useContext, useEffect, useState } from 'react'
import women from "../../assets/women.png"
import { TiTick } from "react-icons/ti";
import { MdOutlineNotificationsActive } from "react-icons/md";
import { TaskDataContext } from '../../context/TaskDataContext';
import { BsThreeDots } from "react-icons/bs";
import { AddModalContext } from '../../context/AddModalContext';
import EditModal from '../modal/EditModal';
import { priorityData } from '../../utils/data';

const Dashboard = () => {
    const [showData, setShowData] = useState()
    const [index, setIndex] = useState(0)
    const { alltaskData, setAllTaskData } = useContext(TaskDataContext)
    const { setEditModal, editModal } = useContext(AddModalContext)
    const [data, setDate] = useState('')
    const [completedPercentage, setCompletedPercentage] = useState(0);
    const [activePercentage, setActivePercentage] = useState(0);
    const [greeting, setGreeting] = useState('');


    const handleEditModal = (item, index) => {
        setEditModal(!editModal)
        setShowData(item)
        setIndex(index)
    }

    const handleSort = (selectedPriority) => {
        // Filter tasks based on selected priority
        const tasksWithSelectedPriority = alltaskData.filter(task => task.priority === selectedPriority);

        // Filter tasks without selected priority
        const tasksWithoutSelectedPriority = alltaskData.filter(task => task.priority !== selectedPriority);

        // Concatenate tasks with selected priority followed by tasks without selected priority
        const sortedTasks = [...tasksWithSelectedPriority, ...tasksWithoutSelectedPriority];

        // Update state with sorted tasks
        setAllTaskData(sortedTasks);
    };

    useEffect(() => {
        // Get current date 
        const currentDate = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = currentDate.toLocaleDateString('en-US', options);
        setDate(formattedDate)

        // Determine the greeting based on the time of the day
        const hour = currentDate.getHours();
        if (hour >= 5 && hour < 12) {
            setGreeting('Good Morning');
        } else if (hour >= 12 && hour < 18) {
            setGreeting('Good Afternoon');
        } else {
            setGreeting('Good Evening');
        }
    }, [])
    
    useEffect(() => {
        // Calculate completed and active task percentages
        const totalTasks = alltaskData.length;
        const completedTasks = alltaskData.filter(task => task.status === "Completed").length;
        const activeTasks = alltaskData.filter(task => task.status === "Active").length;

        const completedPercentage = totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;
        const activePercentage = totalTasks === 0 ? 0 : (activeTasks / totalTasks) * 100;

        setCompletedPercentage(completedPercentage);
        setActivePercentage(activePercentage);
    }, [alltaskData]);

    return (
        <div className=' '>
            <section className=' w-full border shadow-md h-full rounded-2xl md:p-16 p-8 flex flex-col gap-4 relative'>
                <p className='lexend-bold md:text-3xl text-2xl'>Hello, {greeting}!</p>
                <p className='lexend-regular text-sm'>What do you  want to do today?</p>
                <div className='absolute sm:right-0 -right-5 sm:top-4 top-12'>
                    <img className='md:w-[250px] sm:w-[200px] w-[100px] ' src={women} alt="" />
                </div>
            </section>

            <section className='pt-10 flex md:flex-row flex-col gap-10 '>
                <div className='flex sm:flex-row flex-col justify-between sm:gap-6 gap-3 md:hidden'>
                    <div className='bg-[#BA5112] w-full rounded-lg h-auto p-4  md:gap-5 gap-3 flex items-center   sm:mt-6'>
                        <div className='md:h-10 w-7 h-7 md:w-10 bg-white rounded-full flex justify-center items-center text-[#BA5112]'>
                            <TiTick size={27} />
                        </div>
                        <div className=' '>
                            <p className='lexend-medium md:text-2xl text-base text-white'>40%</p>
                            <p className=' lexend-regular md:text-sm text-xs cursor-pointer text-white '>Completed Task</p>
                        </div>
                    </div>

                    <div className='bg-[#EDB046] w-full rounded-lg h-auto p-4  md:gap-5 gap-3 flex items-center   sm:mt-6'>
                        <div className='md:h-10 w-7 h-7 md:w-10 bg-white rounded-full flex justify-center items-center text-[#BA5112]'>
                            <TiTick size={27} />
                        </div>
                        <div className=' '>
                            <p className='lexend-medium md:text-2xl text-base text-white'>60%</p>
                            <p className=' lexend-regular md:text-sm text-xs cursor-pointer text-white '>Completed Task</p>
                        </div>
                    </div>
                </div>

                <div className='grow'>
                    <div className='flex justify-between items-center relative'>
                        <h1 className='lexend-medium text-2xl'>Tasks</h1>
                        <div className=' flex gap-2'>
                            <p className='text-[#BA5112] lexend-regular text-sm cursor-pointer'>Sort by</p>
                            <div>
                                <select
                                    onChange={(e) => handleSort(e.target.value)} // Pass selected priority to handleSort
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none w-24"
                                >
                                    {priorityData.map((item, index) => (
                                        <option className='' key={index}>{item}</option>
                                    ))}
                                </select>

                            </div>
                        </div>
                    </div>
                    <div className='pt-7'>
                        <ul>
                            <li className='w-full flex flex-col sm:gap-5 gap-3 relative'>
                                {
                                    alltaskData[0]?.title ?
                                        <>
                                            {alltaskData?.map((item, index) => (
                                                <div className='lexend-regular w-full border h-16 rounded-xl p-3 flex items-center justify-between pl-6 shadow-md ' key={index}>
                                                    {item.title}
                                                    <div className='flex gap-10'>
                                                        <div className={`border rounded-md px-3 text-sm ${item.priority === "High" ? "border-red-400" : item.priority === "Medium" ? "border-blue-500" : item.priority === "Low" ? "border-yellow-500" : ""}`}>{item?.priority}</div>
                                                        <div className='cursor-pointer hover:scale-105' onClick={() => handleEditModal(item, index)}>
                                                            <BsThreeDots size={25} />
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                            }
                                            <EditModal showData={showData} index={index} />
                                        </>
                                        :
                                        <div className='text-3xl lexend-medium flex justify-center'>
                                            Add Task
                                        </div>
                                }
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Percentage section */}
                <div className='md:flex hidden  flex-col  items-center' >
                    <p className=' lexend-regular text-sm cursor-pointer'>{data}</p>

                    <div className=''>
                        <div className='bg-[#BA5112] max-w-[180px]  rounded-lg h-auto p-7 gap-5 flex flex-col justify-center items-center  mt-10'>
                            <div className='h-10 w-10 bg-white rounded-full flex justify-center items-center text-[#BA5112]'>
                                <TiTick size={27} />
                            </div>
                            <div className='flex flex-col items-center'>
                                <p className='lexend-medium text-2xl text-white'>{completedPercentage.toFixed(0)}%</p>
                                <p className=' lexend-regular text-sm cursor-pointer text-white'>Completed Task</p>
                            </div>
                        </div>

                        <div className='bg-[#EDB046] max-w-[180px]  rounded-lg h-auto p-7 gap-5 flex flex-col justify-center items-center  mt-10'>
                            <div className='h-10 w-10 bg-white rounded-full flex justify-center items-center text-[#BA5112]'>
                                <MdOutlineNotificationsActive size={27} />
                            </div>
                            <div className='flex flex-col items-center'>
                                <p className='lexend-medium text-2xl text-white'>{activePercentage.toFixed(0)}%</p>
                                <p className=' lexend-regular text-sm cursor-pointer text-white'>Active Task</p>
                            </div>
                        </div>
                    </div>

                </div>
            </section>
        </div>
    )
}

export default Dashboard