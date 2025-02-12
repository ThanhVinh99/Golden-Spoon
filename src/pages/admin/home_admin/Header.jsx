import React from 'react';
import { FaSearch } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { AiFillBell } from "react-icons/ai";
import { RxAvatar } from "react-icons/rx";
function Header(props) {
    return (
        <div>
            <header className='flex justify-between items-center mt-3'>
                    <div>
                        <b className='text-2xl'>Good Morning, <span className='text-blue-700'>David</span></b>
                        <p>Your performance summary this week</p>
                    </div>
                    <ul className='flex items-center gap-4'>
                        <li><FaSearch /></li>
                        <li><IoMdMail /></li>
                        <li><AiFillBell /></li>
                        <li className='text-2xl'><RxAvatar /></li>
                    </ul>
                </header>
        </div>
    );
}

export default Header;