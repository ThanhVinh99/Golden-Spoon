import React, { useState } from "react";
import {
    Box,
    Button,
    Modal,
    TextField,
    Typography,
    Avatar,
    IconButton,
} from "@mui/material";
import { useNotification } from '../../../../context/NotificationProvider';
import { MdAddPhotoAlternate } from "react-icons/md";
import { addDocument, updateDocument } from "../../../../services/firebaseService";


function ModalCharacter({ character, setCharacter, open, handleClose, errors, setErrors }) {
    const showNotification = useNotification();

    const handleInput = (e) => {
        const { name, value } = e.target;
        setCharacter({ ...character, [name]: value });
    };
    const validation = () => {
        const newErrors = {};
        newErrors.name = character.name ? "" : "Vui lòng nhập name";
        newErrors.description = character.description ? "" : "Vui lòng nhập mô tả";
        setErrors(newErrors);
        return Object.values(newErrors).some(e => e !== "");
    };
    const addCharacter = async () => {
        try {
            if (validation()) {
                return;
            }
            if (character.id) {
                await updateDocument("Characters", character);
                
            } else {
                await addDocument("Characters", character);
                showNotification("Character added successfully!", "success");
            }
            
            handleClose();
        } catch (error) {
            showNotification("Error adding character", "error");
        }
    }
    const handleAvatarChange = (e) => {
        const file = e.target.files[0]; // Lấy file người dùng chọn
        if (file) {
            const reader = new FileReader(); // Tạo FileReader để đọc file
            reader.onload = (event) => {
                setCharacter((prev) => ({
                    ...prev,
                    imgUrl: event.target.result, // Gán đường dẫn ảnh vào state `avatar`
                }));
            };
            reader.readAsDataURL(file); // Đọc file dưới dạng URL Data
        }
    };
    return (
        <div>
            <Modal open={open} onClose={handleClose}>
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        bgcolor: "white",
                        p: 4,
                        borderRadius: 2,
                        boxShadow: 24,
                        width: 400,
                    }}
                >
                    <Typography variant="h6" mb={2}>
                        {character.id ? "Update" : "Add Character"}
                    </Typography>
                    <TextField
                        fullWidth
                        margin="dense"
                        label="Name Character"
                        name="name"
                        value={character.name}
                        onChange={handleInput}
                        error={!!errors.name}
                        helperText={errors.name}
                    />
                    <TextField
                        fullWidth
                        margin="dense"
                        label="Description"
                        name="description"
                        value={character.description}
                        onChange={handleInput}
                        error={!!errors.description}
                        helperText={errors.description}
                        multiline
                        rows={3}
                    />
                    <div style={{ textAlign: "center", margin: "20px 0" }}>
                        <Avatar
                            src={character?.imgUrl}
                            alt="Avatar"
                            sx={{ width: 100, height: 100, margin: "auto" }}
                        />
                        <IconButton
                            component="label"
                            sx={{ marginTop: 2 }}
                        >
                            <MdAddPhotoAlternate />
                            <input
                                type="file"
                                accept="image/*"
                                hidden
                                onChange={handleAvatarChange}
                            />
                        </IconButton>
                    </div>
                    <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
                        <Button variant="outlined" color="error" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button onClick={addCharacter} variant="contained" color="primary">
                            Yes
                        </Button>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}

export default ModalCharacter;