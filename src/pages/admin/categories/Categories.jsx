import React, { useEffect, useState } from 'react';
import ModalCategories from './ModalCategories';
import TableCategories from './TableCategories';
import ModalDelete from '../../../components/ModalDelete';

import Navboard from '../../../components/Navboard';
const inner = { name: "", description: "" }
function Categories(props) {
    const [category,setCategory] = useState(inner); //du lieu cu moi tren modal
    const [errors, setErrors] = useState(inner);
    const [open, setOpen] = useState(false); // dong mo modal
    const [openDelete, setOpenDelete] = useState(false);
    const [searchTerm, setSearchTerm] = useState(""); // Từ khóa tìm kiếm
    const [page, setPage] = useState(0); // Lưu trang hiện tại
    // mo modaldelete
    const handleOpenDelete = (value) => {
        setOpenDelete(true);
        setCategory(value);
    };
    const onCloseDelete = () => {
        setOpenDelete(false);
    }
    // mở modal thêm
    const handleOpen = () => {
        setOpen(true);
        setCategory(inner);
        setErrors(inner);
    };
    // đóng modal thêm
    const handleClose = () => setOpen(false);
   // 
   const handleChange = (value) => {
    setOpen(true);
    setCategory(value);
    setErrors(inner);
   }
   const handleSearch = (event) => {
    setSearchTerm(event.target.value); // Cập nhật từ khóa tìm kiếm
    setPage(0);
  };
    return (
        <main className='m-3'>
            <Navboard handleSearch={handleSearch} handleOpen={handleOpen} title="List Categories" add="ADD CATEGORY"/>
            <TableCategories page={page} setPage={setPage} searchTerm={searchTerm} handleOpenDelete={handleOpenDelete} category={category} handleChange={handleChange} />
            <ModalCategories open={open} handleClose={handleClose} category={category} setCategory={setCategory} errors={errors} setErrors={setErrors} />
            <ModalDelete openDelete={openDelete} onCloseDelete={onCloseDelete} value={category} name="Categories"/>
        </main>
    );
}

export default Categories;