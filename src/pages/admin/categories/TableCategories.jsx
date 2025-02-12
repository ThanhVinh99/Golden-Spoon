import React, { useContext, useEffect, useState } from 'react';
import { FaEraser } from "react-icons/fa6";
import { FaPaintbrush } from "react-icons/fa6";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination
} from '@mui/material';
import { ContextCategories } from "../../../context/CategoriesProvider";
function TableCategories({handleOpenDelete, handleChange,searchTerm,page,setPage}) {
    const categories = useContext(ContextCategories);
  
        const [rowsPerPage, setRowsPerPage] = useState(5); // Lưu số hàng hiển thị trên mỗi trang
        // Xử lý khi chuyển trang
        const handleChangePage = (event, newPage) => {
            setPage(newPage);
        };
    const filteCategories = categories.filter (
        (category) =>
            category.name.toLowerCase().includes(searchTerm.toLowerCase()) || // Tìm kiếm theo tên
            category.description.toLowerCase().includes(searchTerm.toLowerCase()) // Tìm kiếm theo mô tả
    );

        // Xử lý khi thay đổi số hàng trên mỗi trang
        const handleChangeRowsPerPage = (event) => {
            setRowsPerPage(parseInt(event.target.value, 10));
            setPage(0); // Quay về trang đầu tiên khi thay đổi số hàng
        };
    
        // Lấy dữ liệu hiển thị trên trang hiện tại
        const currentData = filteCategories.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    return (
        <div>
             {/* Bảng hiển thị danh sách tác giả */}
                            <TableContainer className='mt-5'>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>#</TableCell>
                                            <TableCell>Name</TableCell>
                                            <TableCell>Description</TableCell>
                                            <TableCell>Action</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {currentData.map((category, index) => (
                                            <TableRow key={category.id}>
                                                <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                                                <TableCell>{category.name}</TableCell>
                                                <TableCell>{category.description}</TableCell>
                                                <TableCell>
                                                    <div className="flex gap-3">
                                                        <FaPaintbrush onClick={() => handleChange(category)} className='text-blue-700 text-lg' />
                                                        <FaEraser onClick={() => handleOpenDelete(category)}  className='text-red-600 text-lg' />
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            {/* Phân trang */}
                            <TablePagination
                                component="div"
                                count={categories.length} // Tổng số hàng
                                page={page} // Trang hiện tại
                                onPageChange={handleChangePage} // Sự kiện khi chuyển trang
                                rowsPerPage={rowsPerPage} // Số hàng hiển thị trên mỗi trang
                                onRowsPerPageChange={handleChangeRowsPerPage} // Sự kiện khi thay đổi số hàng hiển thị
                            />
        </div>
    );
}

export default TableCategories;