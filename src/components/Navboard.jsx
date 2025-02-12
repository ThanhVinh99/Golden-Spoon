import React, { useEffect, useState } from 'react';
import { FaSearch } from "react-icons/fa";
import { GrAdd } from "react-icons/gr";
import {
    
    TextField, InputAdornment, IconButton
} from '@mui/material';
function Navboard({handleOpen,title,handleSearch, add}) {
    return (
        <main>
             {/* phần trang */}

             <nav className='flex max-md:flex-col justify-between items-center gap-5 mt-5'>
                <h1 className="text-3xl font-bold text-blue-500">{title}</h1>
                <TextField
                    placeholder="Tìm kiếm..."
                    variant="outlined"
                    onChange={handleSearch}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton>
                                    <FaSearch />
                                </IconButton>
                            </InputAdornment>
                        ),
                        sx: {
                            padding: "8px", // Điều chỉnh padding của input
                        },
                    }}
                    sx={{
                        ".MuiOutlinedInput-root": {
                            padding: "0", // Xóa padding mặc định bên ngoài
                        },

                    }}
                />
                <button onClick={handleOpen} className='bg-blue-500 text-white flex items-center gap-3 p-2 border rounded-md whitespace-nowrap'>
                    <GrAdd />   {add}
                </button>               
            </nav>
        </main>
    );
}

export default Navboard;