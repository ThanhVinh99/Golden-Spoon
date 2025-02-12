import React from "react";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Button } from "@mui/material";
import { useNotification } from "../../../../context/NotificationProvider";
import { updateDocument } from "../../../../services/firebaseService";
import { addDocument } from "../../../../services/firebaseService";
function ModalPlan({plan, setPlan, open, handleClose, errors, setErrors}) {
    const showNotification = useNotification();
    const handleInput = (e) => {
        const { name, value } = e.target;
        setPlan({ ...plan, [name]: value });
    };
    const validation = () => {
        const newErrors = {};
        newErrors.level = plan.level ? "" : "Vui lòng nhập cấp độ";
        newErrors.price = plan.price ? "" : "Vui lòng nhập giá tiền";
        newErrors.title = plan.title ? "" : "Vui lòng nhập title";
        setErrors(newErrors);
        return Object.values(newErrors).some(e => e !== "");
    };
    const addPlan = async () => {
        try {
            if (validation()) {
                return;
            }
            if (plan.id) {
                await updateDocument("Plans", plan);
                showNotification("Plan updated successfully!", "success");
            } else {
                await addDocument("Plans", plan);
                showNotification("Category added successfully!", "success");
            };
            handleClose();
        } catch (error) {
            showNotification("Error adding plan", "error");
        }
    };
    return (
       <div>
         <Dialog open={open} onClose={handleClose}>
            <DialogTitle>{plan.id ? "EDIT PLAN" : "ADD PLAN"}</DialogTitle>
            <DialogContent>
                <TextField
                    name="level"
                    label="Level"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={plan?.level || ""}
                    onChange={handleInput}
                    error={!!errors.level}
                    helperText={errors.level}
                />
                <TextField
                    name="title"
                    label="Title"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={plan?.title || ""}
                    onChange={handleInput}
                    error={!!errors.title}
                    helperText={errors.title}
                />
                <TextField
                    name="price"
                    label="Price Per Month"
                    type="number"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={plan?.price || ""}
                    onChange={handleInput}
                    error={!!errors.price}
                    helperText={errors.price}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} variant="outlined">
                    Cancel
                </Button>
                <Button onClick={addPlan} variant="contained">
                    {plan.id ? "Update" : "Add New"}
                </Button>
            </DialogActions>
        </Dialog>
       </div>
    );
}

export default ModalPlan;