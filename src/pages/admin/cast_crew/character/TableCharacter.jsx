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
import { ContextCharacters } from '../../../../context/CharacterProvider';
function TableCharacter({searchTerm,page,setPage,handleOpenDelete, handleChange}) {
    const characters = useContext(ContextCharacters);
    const [rowsPerPage, setRowsPerPage] = useState(5); // Lưu số hàng hiển thị trên mỗi trang
    // Xử lý khi chuyển trang
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
 
const filteCharacters = characters.filter (
    (character) =>
        character.name.toLowerCase().includes(searchTerm.toLowerCase()) || // Tìm kiếm theo tên
    character.description.toLowerCase().includes(searchTerm.toLowerCase()) // Tìm kiếm theo mô tả
);

    // Xử lý khi thay đổi số hàng trên mỗi trang
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0); // Quay về trang đầu tiên khi thay đổi số hàng
    };

    // Lấy dữ liệu hiển thị trên trang hiện tại
    const currentData = filteCharacters.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    return (
        <div>
            <TableContainer className="mt-5">
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell>Image</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {currentData.map((character, index) => (
                            <TableRow key={character.id}>
                                <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                                <TableCell >
                                    <img className="w-[50px] h-[50px] object-cover" src={character.imgUrl} alt="" />
                                </TableCell>
                                <TableCell>{character.name}</TableCell>
                                <TableCell>{character.description}</TableCell>
                                <TableCell>
                                    <div className="flex gap-3">
                                        <FaPaintbrush
                                            className="text-blue-700 text-lg cursor-pointer"
                                            onClick={() => handleChange(character)}
                                        />
                                        <FaEraser
                                            className="text-red-600 text-lg cursor-pointer"
                                            onClick={() => handleOpenDelete(character)}
                                        />
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
                count={characters.length} // Tổng số hàng
                page={page} // Trang hiện tại
                onPageChange={handleChangePage} // Sự kiện khi chuyển trang
                rowsPerPage={rowsPerPage} // Số hàng hiển thị trên mỗi trang
                onRowsPerPageChange={handleChangeRowsPerPage} // Sự kiện khi thay đổi số hàng hiển thị
            />
        </div>
    );
}

export default TableCharacter;