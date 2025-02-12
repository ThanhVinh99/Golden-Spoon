import React, { useState } from 'react';
import Navboard from '../../../../components/Navboard';
import ModalEpisode from './ModalEpisode';
import TableEpisode from './TableEpisode';
import ModalDelete from '../../../../components/ModalDelete';



const inner = { episodeNumber: "", url: "", idmovie: "" }
function Episode(props) {
    const [episode, setEpisode] = useState(inner);
    const [errors, setErrors] = useState(inner);
    const [open, setOpen] = useState(false); // dong mo modal
    const [searchTerm, setSearchTerm] = useState(""); // Từ khóa tìm kiếm
    const [page, setPage] = useState(0); // Lưu trang hiện tại
    const [openDelete, setOpenDelete] = useState(false);

     // mo modaldelete
     const handleOpenDelete = (value) => {
        setOpenDelete(true);
        setEpisode(value);
        
    };
    const onCloseDelete = () => {
        setOpenDelete(false);
    }
     // mở modal thêm
     const handleOpen = () => {
        setOpen(true);
        setEpisode(inner);
        setErrors(inner);
    };
     // đóng modal thêm
     const handleClose = () => setOpen(false);
     const handleChange = (value) => {
        setOpen(true);
        setEpisode(value);
        setErrors(inner);
       };
       const handleSearch = (event) => {
        setSearchTerm(event.target.value); // Cập nhật từ khóa tìm kiếm
        setPage(0);
      };
    return (
        <main className='m-4'>
            <Navboard handleSearch={handleSearch} handleOpen={handleOpen} title="List Episodes" add="ADD EPISODE" />
            <ModalEpisode episode={episode} setEpisode={setEpisode} open={open} handleClose={handleClose} errors={errors} setErrors={setErrors} />
            <TableEpisode searchTerm={searchTerm} page={page} setPage={setPage} handleOpenDelete={handleOpenDelete} handleChange={handleChange}/>
            <ModalDelete openDelete={openDelete} onCloseDelete={onCloseDelete} value={episode} name="Episodes"/>
        </main>
    );
}

export default Episode;