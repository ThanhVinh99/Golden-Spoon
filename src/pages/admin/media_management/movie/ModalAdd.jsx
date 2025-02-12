import React, { useState } from "react";
import { Chip, Dialog, TextField } from "@mui/material";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    // width: 400,
    bgcolor: 'background.paper',
    border: '1px solid',
    boxShadow: 24,
    p: 4,
};


function ModalAdd({ handleCloseadd, openadd, dataChoose, typeChoose, handleSelect, selectedItems }) {

    const isSelected = (item) => selectedItems.includes(item);

    return (
        <div>
            <Modal
                open={openadd}
                onClose={handleCloseadd}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className=" max-w-lg mx-auto">
                        <div className="md:flex gap-3 items-center justify-between">
                            <h2 className="text-lg font-bold whitespace-nowrap">Choose Categories</h2>
                            <TextField
                                label="Search categories..."
                                variant="outlined"
                                size="small"
                                fullWidth
                                className="mb-4"
                            />
                        </div>
                        <div className="flex flex-wrap gap-2 mt-2">
                            {dataChoose?.map((element) => (
                                typeChoose === "categories" ? (
                                    <button
                                        key={element.id}
                                        onClick={() => handleSelect(element.id, typeChoose)}
                                        className={`text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center
                                             ${isSelected(element.id)
                                                 ? "ring-4 ring-cyan-300 dark:ring-cyan-800 bg-gradient-to-r from-purple-500 to-pink-500" : ""}`}
                                    > {element.name}</button>
                                ) : (
                                   <div
                                   className={`p-2 rounded-md ${isSelected(element.id) ? "bg-blue-600" : "bg-green-200"}`}
                                    key={element.id}>
                                     <img
                                         
                                        className="w-[50px] h-[50px] rounded-full object-cover m-auto"
                                        src={element.imgUrl}
                                        onClick={() => handleSelect(element.id, typeChoose)}
                                        alt="#"
                                    />
                                    <div className=" font-bold text-center">{element.name}</div>
                                   </div>
                                )
                            ))}
                        </div>
                        <button onClick={handleCloseadd} className=" mt-4 px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400">
                            Cancel
                        </button>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}

export default ModalAdd;