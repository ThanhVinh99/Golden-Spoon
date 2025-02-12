import React from 'react';
import {
    TextField,
    Modal, Box, Button, MenuItem, FormControl, InputLabel
} from '@mui/material';
import { useNotification } from '../../../context/NotificationProvider';
import { addDocument } from "../../../services/firebaseService";
import { updateDocument } from '../../../services/firebaseService';
function ModalCategories({ open, handleClose, category, setCategory, errors, setErrors }) {
    const showNotification = useNotification();

    const handleInput = (e) => {
        const { name, value } = e.target;
        setCategory({ ...category, [name]: value });
    };

    const validation = () => {
        const newErrors = {};
        newErrors.name = category.name ? "" : "Vui lòng nhập name";
        newErrors.description = category.description ? "" : "Vui lòng nhập mô tả";
        setErrors(newErrors);
        return Object.values(newErrors).some(e => e !== "");
    };

    const addCategory = async () => {
        try {
            if (validation()) {
                return;
            }
            if (category.id) {
                await updateDocument("Categories", category);
            } else {
                await addDocument("Categories", category);
                showNotification("Category added successfully!", "success");
            };
            handleClose();
        } catch (error) {
            showNotification("Error adding category", "error");
        }
    };
   
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
        >
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
                    {category.id ? "Update" : "Add Category"}
                </h2>

                {/* Form */}
                <TextField
                    autoFocus
                    margin="dense"
                    name="name"
                    label="Name Categories"
                    type="text"
                    fullWidth
                    value={category.name || ""}
                    variant="outlined"
                    error={!!errors.name}
                    helperText={errors.name}
                    onChange={handleInput}
                />
                <TextField
                    margin="dense"
                    name="description"
                    label="Mô tả"
                    type="text"
                    fullWidth
                    variant="outlined"
                    multiline
                    value={category.description || ""}
                    rows={4}
                    error={!!errors.description}
                    helperText={errors.description}
                    onChange={handleInput}
                />
                {/* Buttons */}
                <div className="flex justify-end mt-6 gap-2">
                    <Button
                        variant="outlined"
                        color="error"
                        onClick={handleClose}
                    >
                        Cancel
                    </Button>
                    <Button onClick={addCategory} variant="contained" color="primary">
                        Yes
                    </Button>
                </div>
            </Box>
        </Modal>
    );
}

export default ModalCategories;
