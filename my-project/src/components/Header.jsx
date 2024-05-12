import { useContext } from "react";
import { IoExitOutline } from "react-icons/io5";
import { RouteContext } from "../context/RouteContext";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/reducers/auth";
import { useNavigate } from "react-router-dom";


const Header = () => {
  const navigate = useNavigate()

    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);
    
    const { routevalue, setRouteValue } = useContext(RouteContext)


    return (
        <div className="flex flex-row  bg-[#ffffff]  slg:h-[97px] xsm:h-[81px] h-[64px]   ">
            <div className="  flex grow  items-center justify-between pl-8 h-full">
                <div className="md:w-[300px]">
                    <p className="PlusJakartaSans-Bold md:text-2xl sm:text-xl text-xl   lexend-regular text-[#BA5112] lexend-bold ">To-Do App</p>
                </div>
                <div className="  flex grow  items-center slg:justify-between justify-end pr-5 h-full">
                    <div className=" slg:block hidden">
                        <p className="PlusJakartaSans-Bold  text-black xsm:text-2xl sm:text-xl text-lg lexend-regular">{routevalue}</p>
                    </div>
                    {/* <div className="flex sm:gap-3.5 gap-1.5 items-center sm:pr-3.5 pr-2">
                        <button onClick={()=> dispatch(logout())} className="bg-[#BA5112] text-[#FFFFFF]  xmd:h-12 sm:py-2.5 py-2 lexend-regular sm:px-6 px-3 flex gap-3 items-center   rounded-md sm:text-sm text-xs PlusJakartaSans-Bold">
                            <p>
                                Log out
                            </p>
                            <IoExitOutline size={20} />
                        </button>
                    </div> */}
                </div>
            </div>
        </div>
    )
}
export default Header