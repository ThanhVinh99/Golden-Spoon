import React, { useContext, useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Typography,
    Avatar,
    IconButton,
    Grid,
    Autocomplete
} from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useNotification } from '../../../../context/NotificationProvider';
import { addDocument } from "../../../../services/firebaseService";
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { AiFillAppstore } from "react-icons/ai";
import { FaUser } from "react-icons/fa";
import { MdAddPhotoAlternate } from "react-icons/md";
import { TiDelete } from "react-icons/ti";
import { FaUserEdit } from "react-icons/fa";
import { ContextAuthors } from '../../../../context/AuthorsProvider';
import { getObjectById } from '../../../../services/dataService';
import { ClassNames } from '@emotion/react';
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    ...theme.applyStyles('dark', {
        backgroundColor: '#1A2027',
    }),
}));
function ModalMovie({ movie, setMovie, open, handleClose, setErrors, errors, handleChoose, categories, characters, actors, handleSelect }) {
    const authors = useContext(ContextAuthors);


    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };
    const showNotification = useNotification();
    const handleInput = (e) => {
        const { name, value } = e.target;
        setMovie({ ...movie, [name]: value });
        console.log(movie);

    };
    const validation = () => {
        const newErrors = {};
        newErrors.name = movie.name ? "" : "Vui lòng nhập name";
        newErrors.description = movie.description ? "" : "Vui lòng nhập mô tả";
        newErrors.duration = movie.duration ? "" : "Vui lòng nhập khoảng thời gian";
        newErrors.authorID = movie.authorID ? "" : "Vui lòng nhập tac giả";
        newErrors.planID = movie.planID ? "" : "Vui lòng nhập plan";
        newErrors.listCate = movie.listCate.length ? "" : "Vui lòng nhập Thể loại";
        setErrors(newErrors);
        return Object.values(newErrors).some(e => e !== "");
    };
    const addMovie = async () => {
        try {
            if (validation()) {
                return;
            }
            await addDocument("Movies", movie);
            showNotification("Movie added successfully!", "success");
        } catch (error) {
            showNotification("Error adding actor", "error");
        }
    }
    const handleAvatarChange = (e) => {
        const file = e.target.files[0]; // Lấy file người dùng chọn
        if (file) {
            const reader = new FileReader(); // Tạo FileReader để đọc file
            reader.onload = (event) => {
                setMovie((prev) => ({
                    ...prev,
                    imgUrl: event.target.result, // Gán đường dẫn ảnh vào state `avatar`
                }));
            };
            reader.readAsDataURL(file); // Đọc file dưới dạng URL Data
        }
    };
    return (
        <div>
            <Dialog open={open} onClose={handleClose} PaperProps={{
                sx: {
                    width: "80vw", // Set the dialog width
                    maxWidth: "none", // Disable default maxWidth restriction
                },
            }}>
                <DialogTitle>
                    Add Movie
                </DialogTitle>
                <DialogContent >
                    <Grid container spacing={2} alignItems="stretch">
                        <Grid item md={6} xs={12}>
                            <TextField
                                fullWidth
                                margin="dense"
                                label="Name"
                                name="name"
                                value={movie.name}
                                onChange={handleInput}
                                error={!!errors.name}
                                helperText={errors.name}
                            />
                            <TextField
                                fullWidth
                                margin="dense"
                                label="Description"
                                name="description"
                                value={movie.description}
                                onChange={handleInput}
                                error={!!errors.description}
                                helperText={errors.description}
                            />
                            <TextField
                                fullWidth
                                margin="dense"
                                label="Duration(in minutes)"
                                name="duration"
                                type="number"
                                value={movie.duration}
                                onChange={handleInput}
                                error={!!errors.duration}
                                helperText={errors.duration}

                            />
                            <Autocomplete
                                className='mt-2'
                                options={authors} // Danh sách các tác giả
                                getOptionLabel={(option) => option.name} // Hiển thị tên của tác giả
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Tìm kiếm hoặc chọn tác giả"
                                        error={!!errors.authorID}
                                        helperText={errors.authorID}
                                    />
                                )}
                                value={
                                    authors.find((author) => author.id === movie.authorID) || null // Hiển thị giá trị đã chọn
                                }
                                onChange={(event, newValue) => {
                                    // Cập nhật giá trị khi người dùng chọn
                                    handleInput({
                                        target: { name: "authorID", value: newValue ? newValue.id : "" },
                                    });
                                }}
                                isOptionEqualToValue={(option, value) => option.id === value.id} // So sánh giá trị
                                noOptionsText="Không tìm thấy kết quả" // Thông báo khi không có kết quả
                                fullWidth
                            />
                            {/* <FormControl fullWidth margin="dense">
                                <InputLabel id="demo-select-small-label">Author</InputLabel>
                                <Select
                                    labelId="demo-select-small-label"
                                    id="demo-select-small"
                                    value={movie.authorID}
                                    label="Age"
                                    name='authorID'
                                    onChange={handleInput}
                                >
                                    {authors.map((author, index) => (
                                        <MenuItem key={author.id}>{author.name}</MenuItem>
                                    ))}


                                </Select>
                            </FormControl> */}
                            <FormControl fullWidth margin="dense">
                                <InputLabel id="demo-select-small-label">Plan</InputLabel>
                                <Select
                                    labelId="demo-select-small-label"
                                    id="demo-select-small"
                                    value={age}
                                    label="Age"
                                    onChange={handleChange}
                                >
                                    <MenuItem value={10}>Basic</MenuItem>
                                    <MenuItem value={20}>Premium</MenuItem>
                                    <MenuItem value={30}>Thi</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <div>

                                <Stack
                                    fullWidth
                                    direction="column"
                                    spacing={2}
                                    sx={{
                                        justifyContent: "center",
                                        alignItems: "flex-start",
                                    }}
                                >
                                    <div>
                                        <div className="flex gap-2 items-center mb-2"><AiFillAppstore onClick={() => handleChoose('categories')} /> Categories</div>
                                        <ul className="flex flex-wrap gap-2">
                                            {movie.listCate.map(e => (
                                                <button className=" bg-slate-400 border rounded-lg p-2 relative">
                                                    {getObjectById(e, categories)?.name}
                                                    <TiDelete onClick={() => handleSelect(e, "categories")} className="absolute top-0 right-0 translate-x-1/3 -translate-y-1/3 text-red-500 bg-white rounded-full cursor-pointer hover:scale-110 transition duration-200" />
                                                </button>
                                            ))}

                                            {errors.listCate && <p className='text-red-600'>{errors.listCate}</p>}

                                        </ul>
                                    </div>
                                    <div>
                                        <div className="flex gap-2 items-center  mb-2"><FaUser onClick={() => handleChoose('actors')} /> Actor</div>
                                        <div className="flex gap-3">
                                            {movie.listActor.map(e => (
                                                <>
                                                    <div className='relative'>
                                                        <img className="w-[50px] h-[50px] rounded-full object-cover" src={getObjectById(e, actors)?.imgUrl} alt="" />
                                                        <TiDelete onClick={() => handleSelect(e, "actors")} className="absolute top-0 right-0 translate-x-1/3 -translate-y-1/3 text-red-500 bg-white rounded-full cursor-pointer hover:scale-110 transition duration-200" />
                                                    </div>
                                                </>
                                            ))}


                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex gap-2 items-center  mb-2"><FaUserEdit onClick={() => handleChoose('characters')} />Character</div>
                                        <div className="flex gap-3">
                                            {movie.listCharacter.map(e => (
                                                <nav className='flex flex-col items-center justify-center'>
                                                    <div className='relative '>
                                                        <img className="w-[50px] h-[50px] rounded-full object-cover" src={getObjectById(e, characters)?.imgUrl} alt="" />
                                                        <TiDelete onClick={() => handleSelect(e, "characters")} className="absolute top-0 right-0 translate-x-1/3 -translate-y-1/3 text-red-500 bg-white rounded-full cursor-pointer hover:scale-110 transition duration-200" />
                                                    </div>
                                                    <div>{getObjectById(e, characters)?.name}</div>
                                                </nav>
                                            ))}
                                        </div>
                                    </div>

                                </Stack>
                                <div className="flex mt-3 justify-center items-start">
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
                                    <Avatar
                                        src={movie?.imgUrl}
                                        alt="Avatar"
                                        sx={{ width: 100, height: 100, margin: "auto" }}
                                    />

                                </div>
                            </div>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} variant="outlined" color="error" >
                        Cancel
                    </Button>
                    <Button onClick={addMovie} variant="contained" color="primary">
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default ModalMovie;