import { useState } from "react"
import { Link, Outlet } from "react-router-dom"

// import components
import Sidebar from "./Sidebar";

const AdminLayout = () => {
    const [extend, setExtend] = useState(true);
    const [open, setOpen] = useState(false);

    return (
        <div className={`h-auto overflow-hidden flex relative w-full transition-all duration-200 ${extend ? "pl-[var(--admin-sidebar-lg)]" : "pl-[var(--admin-sidebar-sm)]"} sm:pl-0`}>
            <div className={`fixed top-0 left-0 bottom-0 h-full transition-all duration-200 ${extend ? 'w-[var(--admin-sidebar-lg)]' : 'w-[var(--admin-sidebar-sm)]'} sm:w-[30rem] sm:fixed sm:top-0 ${open ? 'sm:left-0' : 'sm:left-[-30rem]'}`}>
                <Sidebar open={open} setOpen={setOpen} extend={extend} setExtend={setExtend} />
            </div>

            <div className="w-[100%] min-h-[100vh] flex flex-col">
                <div className="h-[var(--nav-height)] px-[2rem] shadow-sm flex items-center justify-between sm:px-0">
                    <div>
                        <i onClick={() => setOpen(!open)} className="fa-solid fa-bars ml-[2rem] text-[2rem] cursor-pointer hidden sm:flex"></i>
                        <i onClick={() => setExtend(!extend)} className={`${extend ? "fa-solid fa-arrow-left-long" : "fa-solid fa-bars"} text-[2rem] cursor-pointer sm:hidden`} ></i>
                    </div>
                </div>

                <div className="h-full p-[2rem] overflow-y-auto">
                    <Outlet />
                </div>

            </div>
        </div>
    )
}

export default AdminLayout