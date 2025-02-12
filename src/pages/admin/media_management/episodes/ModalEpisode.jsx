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
import { addDocument } from "../../../../services/firebaseService";

function ModalEpisode({episode, setEpisode, open, handleClose, errors, setErrors}) {
    const showNotification = useNotification();
    const handleInput = (e) => {
        const { name, value } = e.target;
        setEpisode({ ...episode, [name]: value });
    };
    const validation = () => {
        const newErrors = {};
        newErrors.episodeNumber = episode.episodeNumber ? "" : "Vui lòng nhập Episode Number";
        newErrors.url = episode.url ? "" : "Vui lòng nhập URL";
        newErrors.idmovie = episode.idmovie ? "" : "Vui lòng nhập ID Movie";
        setErrors(newErrors);
        return Object.values(newErrors).some(e => e !== "");
    };
    const addEpisode = async () => {
            try {
                if (validation()) {
                    return;
                } else {
                    await addDocument("Episodes", episode);
                    showNotification("Episodes added successfully!", "success");
                }
                handleClose();
            } catch (error) {
                showNotification("Error adding episode", "error");
            }
        }
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
                    {episode.id ? "Update" : "Add Episode"}
                    </Typography>
                    <TextField
                        fullWidth
                        margin="dense"
                        label="Episode Number"
                        name="episodeNumber"
                        value={episode.episodeNumber}
                        onChange={handleInput}
                        error={!!errors.name}
                        helperText={errors.name}
                    />
                    <TextField
                        fullWidth
                        margin="dense"
                        label="Episode URL"
                        name="url"
                        value={episode.url}
                        onChange={handleInput}
                        error={!!errors.description}
                        helperText={errors.description}
                        multiline
                        rows={3}
                    />
                    <TextField
                        fullWidth
                        margin="dense"
                        label="ID Movie"
                        name="idmovie"
                        value={episode.idmovie}
                        onChange={handleInput}
                        error={!!errors.description}
                        helperText={errors.description}
                        multiline
                        rows={3}
                    />
                    <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
                        <Button onClick={handleClose} variant="outlined" color="error">
                            Cancel
                        </Button>
                        <Button onClick={addEpisode} variant="contained" color="primary">
                            Yes
                        </Button>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}

export default ModalEpisode;