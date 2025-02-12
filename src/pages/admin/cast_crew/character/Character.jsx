import React, { useState } from 'react';
import Navboard from '../../../../components/Navboard';
import ModalCharacter from './ModalCharacter';
import TableCharacter from './TableCharacter';
import ModalDelete from '../../../../components/ModalDelete';
const inner = { name: "", description: "", imgUrl: "" }
function Character(props) {
    const [character, setCharacter] = useState(inner);
    const [errors, setErrors] = useState(inner);
    const [open, setOpen] = useState(false); // dong mo modal
    const [searchTerm, setSearchTerm] = useState(""); // Từ khóa tìm kiếm
    const [page, setPage] = useState(0); // Lưu trang hiện tại
    const [openDelete, setOpenDelete] = useState(false);
     // mo modaldelete
     const handleOpenDelete = (value) => {
        setOpenDelete(true);
        setCharacter(value);
        
    };
    const onCloseDelete = () => {
        setOpenDelete(false);
    }
     // mở modal thêm
     const handleOpen = () => {
        setOpen(true);
        setCharacter(inner);
        setErrors(inner);
    };
     // đóng modal thêm
     const handleClose = () => setOpen(false);
     const handleChange = (value) => {
        setOpen(true);
        setCharacter(value);
        setErrors(inner);
       };
       const handleSearch = (event) => {
        setSearchTerm(event.target.value); // Cập nhật từ khóa tìm kiếm
        setPage(0);
      };
    return (
        <main className='m-4'>
            <Navboard handleSearch={handleSearch} handleOpen={handleOpen} title="List Characters" add="ADD CHARACTER" />
            {/* modal */}
            <ModalCharacter character={character} setCharacter={setCharacter} open={open} handleClose={handleClose} errors={errors} setErrors={setErrors}/>
            <TableCharacter searchTerm={searchTerm} page={page} setPage={setPage} handleOpenDelete={handleOpenDelete} handleChange={handleChange}/>
            <ModalDelete openDelete={openDelete} onCloseDelete={onCloseDelete} value={character} name="Characters" />
        </main>
    );
}

export default Character;