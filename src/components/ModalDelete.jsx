import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from '@mui/material';
import { deleteDocument } from "../services/firebaseService";

function ModalDelete({onCloseDelete, openDelete, value,name}) {

 
    const handleDelete = async () => {
      await deleteDocument(name, value);
      onCloseDelete();
    }

    return (
        <Dialog open={openDelete} onClose={onCloseDelete}>
        <DialogTitle>Delete Modal</DialogTitle>
        <DialogContent>
            <h1>Bạn có xác nhận xóa hay không ? </h1>
        </DialogContent>
        <DialogActions>
          <Button  onClick={onCloseDelete}>Hủy</Button>
          <Button onClick={handleDelete} variant="contained" color="error">
            Xác Nhận
          </Button>
        </DialogActions>
      </Dialog>
    );
}

export default ModalDelete;