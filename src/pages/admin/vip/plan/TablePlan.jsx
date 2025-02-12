import React, { useContext, useState } from 'react';
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
import { ContextPlan } from '../../../../context/PlansProvider'; 
function TablePlan({handleOpenDelete, handleChange,searchTerm,page,setPage}) {
    const plans = useContext(ContextPlan)
    const [rowsPerPage, setRowsPerPage] = useState(5); // Lưu số hàng hiển thị trên mỗi trang
    // Xử lý khi chuyển trang
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const filtePlans = plans.filter(
        (plan) =>
            plan.level.toLowerCase().includes(searchTerm.toLowerCase()) || // Tìm kiếm cấp độ
            plan.title.toLowerCase().includes(searchTerm.toLowerCase()) // Tìm kiếm theo mô tả
    );

    // Xử lý khi thay đổi số hàng trên mỗi trang
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0); // Quay về trang đầu tiên khi thay đổi số hàng
    };
console.log(plans);

    // Lấy dữ liệu hiển thị trên trang hiện tại
    const currentData = filtePlans.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    return (
        <div>
            <TableContainer className='mt-5'>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell>Level</TableCell>
                            <TableCell>Title</TableCell>
                            <TableCell>Price/Month</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {currentData.map((plan, index) => (
                            <TableRow key={plan.id}>
                                <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                                <TableCell>{plan.level}</TableCell>
                                <TableCell>{plan.title}</TableCell>
                                <TableCell>{plan.price}</TableCell>
                                <TableCell>
                                    <div className="flex gap-3">
                                        <FaPaintbrush onClick={() => handleChange(plan)} className='text-blue-700 text-lg' />
                                        <FaEraser onClick={() => handleOpenDelete(plan)} className='text-red-600 text-lg' />
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
                count={plans.length} // Tổng số hàng
                page={page} // Trang hiện tại
                onPageChange={handleChangePage} // Sự kiện khi chuyển trang
                rowsPerPage={rowsPerPage} // Số hàng hiển thị trên mỗi trang
                onRowsPerPageChange={handleChangeRowsPerPage} // Sự kiện khi thay đổi số hàng hiển thị
            />
        </div>
    );
}

export default TablePlan;