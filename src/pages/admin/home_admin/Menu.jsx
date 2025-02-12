import React, { useState } from 'react';
import { FiMenu } from "react-icons/fi";
import { AiFillDatabase } from "react-icons/ai";
import { IoIosPeople } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { BiGrid } from "react-icons/bi";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { menuList } from '../../../utils/Constants';
import { Link } from 'react-router-dom';

function Menu(props) {
    const [activeMenu, setActiveMenu] = useState(null); // State lưu menu đang được mở
    const [isCollapsed, setIsCollapsed] = useState(false); // State ẩn/hiện tiêu đề menu

    const toggleMenu = (menuId) => {
        setActiveMenu((prev) => (prev === menuId ? null : menuId)); // Đóng menu nếu đang mở, ngược lại thì mở
    };

    return (
        <main className='min-h-screen bg-slate-200'>
            {/* Header */}
            <header className='flex gap-2 items-center justify-center p-3'>
                <button
                    className='text-lime-500'
                    onClick={() => setIsCollapsed((prev) => !prev)} // Toggle ẩn/hiện tiêu đề
                >
                    <FiMenu />
                </button>
                {!isCollapsed && <h1 className='text-2xl font-bold'>CinesStream</h1>}
            </header>

            {/* Menu */}
            <div className='m-2'>
                {/* Dashboard */}
                <Link to="/">
                    <div
                        className={`bg-lime-400 flex items-center mt-4 border rounded-md p-1 text-white hover:bg-lime-600 ${
                            isCollapsed ? "justify-center" : "gap-2"
                        }`}
                    >
                        <AiFillDatabase />
                        {!isCollapsed && <span>Dashboard</span>}
                    </div>
                </Link>

                {/* UI Elements */}
                <div className='mt-4'>
                    {!isCollapsed && <h2>UI ELEMENTS</h2>}
                    <Link to="/categories/categories">
                        <div
                            className={`bg-lime-400 flex items-center border rounded-md p-1 text-white hover:bg-lime-600 ${
                                isCollapsed ? "justify-center" : "gap-2"
                            }`}
                        >
                            <BiGrid />
                            {!isCollapsed && <span>Categories</span>}
                        </div>
                    </Link>
                </div>

                {/* Form and Datas */}
                <div className='mt-4'>
                    {!isCollapsed && <h2>FORM AND DATAS</h2>}
                    <ul>
                        {menuList?.map((list, index) => (
                            <div key={index}>
                                <li
                                    className={`flex justify-between items-center bg-lime-400 border rounded-md p-1 text-white hover:bg-lime-600 cursor-pointer ${
                                        isCollapsed ? "justify-center" : "gap-2"
                                    }`}
                                    onClick={() => toggleMenu(list.id)}
                                >
                                    <div className='flex items-center gap-2'>
                                        {list.icon} {!isCollapsed && list.title}
                                    </div>
                                    {!isCollapsed &&
                                        (activeMenu === list.id ? <IoIosArrowUp /> : <IoIosArrowDown />)}
                                </li>
                                <div className={activeMenu === list.id ? "block" : "hidden"}>
                                    {list.items.map((listItem, subIndex) => (
                                        <Link to={listItem.path} key={subIndex}>
                                            <li
                                                className={`mt-2 text-center hover:bg-lime-500 hover:text-white ${
                                                    isCollapsed ? "hidden" : ""
                                                }`}
                                            >
                                                {listItem.title}
                                            </li>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </ul>
                </div>

                {/* Pages */}
                <div className='mt-4'>
                    {!isCollapsed && <h2>PAGES</h2>}
                    <Link to="/user_pages/userpages">
                        <li
                            className={`flex items-center bg-lime-400 border rounded-md p-1 text-white hover:bg-lime-600 ${
                                isCollapsed ? "justify-center" : "gap-2"
                            }`}
                        >
                            <IoIosPeople /> {!isCollapsed && <span>User Pages</span>}
                        </li>
                    </Link>
                </div>

                {/* Help */}
                <div className='mt-4'>
                    {!isCollapsed && <h2>HELP</h2>}
                    <Link to="/profile/profile">
                        <li
                            className={`flex items-center bg-lime-400 border rounded-md p-1 text-white hover:bg-lime-600 ${
                                isCollapsed ? "justify-center" : "gap-2"
                            }`}
                        >
                            <FaUser /> {!isCollapsed && <span>Profile</span>}
                        </li>
                    </Link>
                </div>
            </div>
        </main>
    );
}

export default Menu;
