import React, { useContext, useState } from 'react';
import { FaEraser, FaPaintbrush } from "react-icons/fa6";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    TablePagination,
    Modal, Box, Button,
} from '@mui/material';
import Navboard from '../../../components/Navboard';
import { useNotification } from '../../../context/NotificationProvider';
import { addDocument, deleteDocument, updateDocument } from "../../../services/firebaseService";
import { ContextAuthors } from '../../../context/AuthorsProvider';
import ModalDelete from '../../../components/ModalDelete';

const inner = { name: "", description: "" };

function Author() {
    const authors = useContext(ContextAuthors); // Lấy danh sách từ Context
    const [page, setPage] = useState(0); // Lưu trang hiện tại
    const [rowsPerPage, setRowsPerPage] = useState(5); // Số hàng mỗi trang
    const [author, setAuthor] = useState(inner);
    const [errors, setErrors] = useState(inner);
    const [searchTerm, setSearchTerm] = useState("");
    const [editMode, setEditMode] = useState(false); // Chế độ chỉnh sửa
    const [currentId, setCurrentId] = useState(null); // Lưu ID của tác giả đang sửa
    const [openDelete, setOpenDelete] = useState(false);
     // mo modaldelete
     const handleOpenDelete = (value) => {
        setOpenDelete(true);
        setAuthor(value);
    };
    const onCloseDelete = () => {
        setOpenDelete(false);
    }

    // Modal trạng thái
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        resetForm();
    };

    const showNotification = useNotification();

    // Lọc danh sách tác giả theo từ khóa tìm kiếm
    const filteredAuthors = authors.filter(
        (author) =>
            author.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            author.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const handleSearch = (event) => {
        setSearchTerm(event.target.value); // Cập nhật từ khóa tìm kiếm
        setPage(0);
      };
    // Phân trang
    const handleChangePage = (event, newPage) => setPage(newPage);
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const currentData = filteredAuthors.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    );

    // Xử lý input
    const handleInput = (e) => {
        const { name, value } = e.target;
        setAuthor({ ...author, [name]: value });
    };

    // Kiểm tra lỗi
    const validation = () => {
        const newErrors = {};
        newErrors.name = author.name ? "" : "Vui lòng nhập tên";
        newErrors.description = author.description ? "" : "Vui lòng nhập mô tả";
        setErrors(newErrors);
        return Object.values(newErrors).some(e => e !== "");
    };

    // Reset form
    const resetForm = () => {
        setAuthor(inner);
        setErrors(inner);
        setEditMode(false);
        setCurrentId(null);
    };

    // Thêm tác giả mới
    const addAuthor = async () => {
        if (validation()) return;
        try {
            await addDocument("Authors", author);
            showNotification("Author added successfully!", "success");
            handleClose();
        } catch (error) {
            showNotification("Failed to add author!", "error");
        }
    };

    // Cập nhật tác giả
    const updateAuthor = async () => {
        if (validation()) return;
        try {
            await updateDocument("Authors", author);
            showNotification("Author updated successfully!", "success");
            handleClose();
        } catch (error) {
            showNotification("Failed to update author!", "error");
        }
    };

    

    // Mở modal chỉnh sửa
    const handleEdit = (id, author) => {
        setCurrentId(id);
        setAuthor(author);
        setEditMode(true);
        handleOpen();
    };

    return (
        <main className="m-3">
            {/* Thanh điều hướng */}
            <nav className="mt-5">
                <Navboard handleSearch={handleSearch} title="List Author" add="ADD AUTHOR" handleOpen={handleOpen} />
            </nav>

            {/* Modal */}
            <Modal open={open} onClose={handleClose}>
                <Box
                    className="bg-white p-6 rounded-lg shadow-lg"
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                    }}
                >
                    <h2 className="text-lg font-bold mb-4">
                        {editMode ? "Edit Author" : "Add Author"}
                    </h2>

                    <form className="space-y-4">
                        <TextField
                            name="name"
                            label="Name Author"
                            variant="outlined"
                            fullWidth
                            value={author.name}
                            error={!!errors.name}
                            helperText={errors.name}
                            onChange={handleInput}
                        />
                        <TextField
                            name="description"
                            label="Description"
                            variant="outlined"
                            fullWidth
                            multiline
                            rows={3}
                            value={author.description}
                            error={!!errors.description}
                            helperText={errors.description}
                            onChange={handleInput}
                        />
                    </form>

                    <div className="flex justify-end mt-6 gap-2">
                        <Button variant="outlined" color="error" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={editMode ? updateAuthor : addAuthor}
                        >
                            {editMode ? "Update" : "Add"}
                        </Button>
                    </div>
                </Box>
            </Modal>

            <section>
                {/* Bảng hiển thị danh sách tác giả */}
                <TableContainer className="mt-5">
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>#</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Description</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {currentData.map((author, index) => (
                                <TableRow key={author.id}>
                                    <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                                    <TableCell>{author.name}</TableCell>
                                    <TableCell>{author.description}</TableCell>
                                    <TableCell>
                                        <div className="flex gap-3">
                                            <FaPaintbrush
                                                className="text-blue-700 text-lg cursor-pointer"
                                                onClick={() => handleEdit(author.id, author)}
                                            />
                                            <FaEraser
                                                className="text-red-600 text-lg cursor-pointer"
                                                onClick={() => handleOpenDelete(author)}
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
                    count={authors.length}
                    page={page}
                    onPageChange={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </section>
            <ModalDelete openDelete={openDelete} onCloseDelete={onCloseDelete} value={author} name="Authors"/>
        </main>
    );
}

export default Author;
