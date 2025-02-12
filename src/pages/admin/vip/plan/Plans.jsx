import React, {  useState } from 'react';
import Navboard from '../../../../components/Navboard';
import ModalPlan from './ModalPlan';
import TablePlan from './TablePlan';

const inner = { level: "", price: "", title: "" };
function Plans(props) {
        const [plan, setPlan] = useState(inner);
        const [errors, setErrors] = useState(inner);
        const [open, setOpen] = useState(false); // dong mo modal
        const [searchTerm, setSearchTerm] = useState(""); // Từ khóa tìm kiếm
        const [page, setPage] = useState(0); // Lưu trang hiện tại
        const [openDelete, setOpenDelete] = useState(false);
    
         // mo modaldelete
         const handleOpenDelete = (value) => {
            setOpenDelete(true);
            setPlan(value);
            
        };
        const onCloseDelete = () => {
            setOpenDelete(false);
        }
         // mở modal thêm
         const handleOpen = () => {
            setOpen(true);
            setPlan(inner);
            setErrors(inner);
        };
         // đóng modal thêm
         const handleClose = () => setOpen(false);
         const handleChange = (value) => {
            setOpen(true);
            setPlan(value);
            setErrors(inner);
           };
           const handleSearch = (event) => {
            setSearchTerm(event.target.value); // Cập nhật từ khóa tìm kiếm
            setPage(0);
          };
    return (
        <div>
            <Navboard handleSearch={handleSearch} handleOpen={handleOpen} title="List Plan" add="ADD PLAN"/>
            <ModalPlan plan={plan} setPlan={setPlan} open={open} handleClose={handleClose} errors={errors} setErrors={setErrors}/>
            <TablePlan page={page} setPage={setPage} searchTerm={searchTerm} handleOpenDelete={handleOpenDelete} plan={plan} handleChange={handleChange}/>
        </div>
    );
}

export default Plans;