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
import { ContextEpisodes } from '../../../../context/EpisodesProvider'
function TableEpisode({searchTerm,page,setPage,handleOpenDelete, handleChange}) {
    const episodes = useContext(ContextEpisodes);
    const [rowsPerPage, setRowsPerPage] = useState(5); // Lưu số hàng hiển thị trên mỗi trang
    // Xử lý khi chuyển trang
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const filteEpisodes = episodes.filter(
        (episode) =>
            episode.episodeNumber.toLowerCase().includes(searchTerm.toLowerCase()) || // Tìm kiếm theo tên
        episode.url.toLowerCase().includes(searchTerm.toLowerCase()) || // Tìm kiếm theo mô tả
        episode.idmovie.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Xử lý khi thay đổi số hàng trên mỗi trang
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0); // Quay về trang đầu tiên khi thay đổi số hàng
    };

    // Lấy dữ liệu hiển thị trên trang hiện tại
    const currentData = filteEpisodes.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    return (
        <div>
            <TableContainer className="mt-5">
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell>Episodes Number</TableCell>
                            <TableCell>Episdode URL</TableCell>
                            <TableCell>ID Movie</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {currentData.map((episode, index) => (
                            <TableRow key={episode.id}>
                                <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                                <TableCell>{episode.episodeNumber}</TableCell>
                                <TableCell>{episode.url}</TableCell>
                                <TableCell>{episode.idmovie}</TableCell>
                                <TableCell>
                                    <div className="flex gap-3">
                                        <FaPaintbrush
                                            className="text-blue-700 text-lg cursor-pointer"
                                            onClick={() => handleChange(episode)}
                                        />
                                        <FaEraser
                                            className="text-red-600 text-lg cursor-pointer"
                                            onClick={() => handleOpenDelete(episode)}
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
                count={episodes.length} // Tổng số hàng
                page={page} // Trang hiện tại
                onPageChange={handleChangePage} // Sự kiện khi chuyển trang
                rowsPerPage={rowsPerPage} // Số hàng hiển thị trên mỗi trang
                onRowsPerPageChange={handleChangeRowsPerPage} // Sự kiện khi thay đổi số hàng hiển thị
            />a
        </div>
    );
}

export default TableEpisode;