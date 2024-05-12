import { useContext, useEffect, useRef, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { AddModalContext } from "../../context/AddModalContext";
import { priorityData } from "../../utils/data";
import { TaskDataContext } from "../../context/TaskDataContext";


// const oldTasks = localStorage.getItem("tasks")

// console.log(oldTasks);

const AddModal = () => {
    const [taskData, setTaskData] = useState({
        title: "",
        priority: "High",
        description: "",
        status: "Active"
    })
    const modalRef = useRef(null);
    const [showoption, setShowOption] = useState(false)
    const { addNewModal, setAddNewModal } = useContext(AddModalContext)
    const { alltaskData, setAllTaskData } = useContext(TaskDataContext)

    //
    const handleChange = (e) => {
        const { name, value } = e.target
        setTaskData(prev => {
            return { ...prev, [name]: value }
        })
    }

    // submit data and pass to context
    const handleSubmit = (e) => {
        e.preventDefault()

        // Get current date
        const currentDate = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = currentDate.toLocaleDateString('en-US', options);

        // Add formatted date to task data
        const taskWithDate = {
            ...taskData,
            date: formattedDate
        };

        setAllTaskData(prev => {
            return [...prev, taskWithDate]
        })
        setAddNewModal(false)
    }

    // close modal in clicking outside 
    useEffect(() => {
        const handleClickOutside = (event) => {
            const target = event.target;
            if (modalRef.current && !modalRef.current.contains(target)) {
                setAddNewModal(false);
            }
        };
        if (addNewModal) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [addNewModal, setAddNewModal]);

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(alltaskData))
        //    localStorage.setItem("tasks","Heelo" )
        // setAddNewModal(false)

    }, [alltaskData])

    console.log("task", alltaskData);

    return (
        <>
            <div
                className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none px-4">
                <div className="relative  my-6 mx-auto max-w-[537px] w-full" >
                    {/*content*/}
                    <div ref={modalRef} className="border-0 rounded-lg px-6 py-[22px] shadow-lg relative flex flex-col w-full bg-[#ffffff] outline-none focus:outline-none">
                        {/*header*/}
                        <div className="flex items-start justify-between   rounded-t">
                            <h3 className="lexend-regular text-lg">
                                Add New Task
                            </h3>
                        </div>
                        {/*body*/}
                        <form onSubmit={handleSubmit}>
                            <div className="relative  flex-auto pt-4">
                                <label className="PlusJakartaSans-Bold text-[#828FA3] text-xs" htmlFor="">Title</label>
                                <input className="w-full outline-none border rounded-[5px] h-10 pl-3 mt-1 font-light text-sm PlusJakartaSans-Medium placeholder:font-thin"
                                    onChange={handleChange}
                                    name="title"
                                    type="filed1"
                                    placeholder="e.g Web Developement"
                                />
                                {/* <div className="absolute top-14 right-2">{errors.field1 && <div className="text-red-500 PlusJakartaSans-Medium text-xs">{errors.field1.message}</div>}</div> */}
                            </div>
                            <div className="relative  flex-auto pt-4">
                                <label className="PlusJakartaSans-Bold text-[#828FA3] text-xs" htmlFor="">Priority</label>
                                <div className=' '
                                    name='priority'>
                                    <select
                                        name="priority"
                                        onChange={handleChange}
                                        className='h-10 max-w-screen w-full border rounded-lg flex   relative ' onClick={() => setShowOption(!showoption)} >
                                        {
                                            priorityData.map((item, index) => (
                                                <option
                                                    className='hover:bg-[#EDB046] lexend-regular w-full flex flex-col justify-center pl-5  h-10 cursor-pointer' key={index}>
                                                    {item}
                                                </option>

                                            ))
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className="relative  flex-auto pt-4">
                                <label className="PlusJakartaSans-Bold text-[#828FA3] text-xs" htmlFor="">Descriptoin (optional)</label>
                                <textarea
                                    onChange={handleChange}
                                    name="description"
                                    className="w-full pt-2 h-16 outline-none border rounded-[5px]  pl-3 mt-1 font-light text-sm PlusJakartaSans-Medium placeholder:font-thin"
                                    placeholder="e.g. Start learning Things"
                                    id="">

                                </textarea>
                                {/* <div className="absolute top-14 right-2">{errors.field1 && <div className="text-red-500 PlusJakartaSans-Medium text-xs">{errors.field1.message}</div>}</div> */}
                            </div>

                            <div className="pt-3 gap-2 flex justify-end ">
                                {/* <button  className="bg-[#ebeaf8] PlusJakartaSans-Bold  rounded-full w-full py-2 text-[#635FC7]">+ Add New Subtask</button> */}
                                <button className="lexend-medium border px-4 py-1 rounded-lg border-[#EDB046]" onClick={() => setAddNewModal(false)}>Cancel</button>
                                <button className="lexend-medium border px-4 py-1 rounded-lg bg-[#EDB046]">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className="opacity-40 fixed inset-0 z-40 bg-black" ></div>
        </>
    )
}

export default AddModal