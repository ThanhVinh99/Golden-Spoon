import React, { useEffect, useState } from 'react';
import Navboard from '../../../../components/Navboard';
import ModalActors from './ModalActors';
import TableActors from './TableActors';
import ModalDelete from '../../../../components/ModalDelete';


const inner = { name: "", description: "", imgUrl: "" }
function Actor(props) {
    const [actor,setActor] = useState(inner); //du lieu cu moi tren modal
        const [errors, setErrors] = useState(inner);
        const [open, setOpen] = useState(false); // dong mo modal
        const [openDelete, setOpenDelete] = useState(false);
        const [searchTerm, setSearchTerm] = useState(""); // Từ khóa tìm kiếm
        const [page, setPage] = useState(0); // Lưu trang hiện tại
        // mo modaldelete
        const handleOpenDelete = (value) => {
            setOpenDelete(true);
            setActor(value);
        };
        const onCloseDelete = () => {
            setOpenDelete(false);
        }
        // mở modal thêm
        const handleOpen = () => {
            setOpen(true);
            setActor(inner);
            setErrors(inner);
        };
        // đóng modal thêm
        const handleClose = () => setOpen(false);
       // 
       const handleChange = (value) => {
        setOpen(true);
        setActor(value);
        setErrors(inner);
       }
       const handleSearch = (event) => {
        setSearchTerm(event.target.value); // Cập nhật từ khóa tìm kiếm
        setPage(0);
      };
    return (
        <main className='mt-3 p-3'>
            <Navboard handleSearch={handleSearch} handleOpen={handleOpen} title="List Actor" add="ADD ACTOR"/>
            <ModalActors actor={actor} setActor={setActor}  open={open} handleClose={handleClose} errors={errors} setErrors={setErrors}/>
            <TableActors searchTerm={searchTerm} page={page} setPage={setPage} handleOpenDelete={handleOpenDelete} handleChange={handleChange} />
            <ModalDelete openDelete={openDelete} onCloseDelete={onCloseDelete} value={actor} name="Actors" />
        </main>
    );
}

export default Actor;