import { useState, useEffect } from "react";
import { Button, TextField } from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';



export default function AddCar(props) {

    //states
    const [car, setCar] = useState({ brand: '', model: '' })

    const [open, setOpen] = useState(false);

    const handleClose = (_, reason) => {
        if (reason != 'backdropClick') {
            setOpen(false);
        }
    }

    const handleInputChange = (event) => {
        setCar({ ...car, [event.target.name]: event.target.value })
    }

    const handleSave = () => {
        // handleClose();
        props.addCar(car);
        setOpen(false); // dialogin sulku
    }

    // return
    // addbutton
    //dialogform
    return (
        <>
            <Button onClick={() => setOpen(true)} variant="container">New car</Button>
            <Dialog
                open={open}
                onClose={handleClose}>
                <DialogTitle>New Car</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Brand"
                        name="brand"
                        value={car.brand}
                        onChange={handleInputChange}
                    ></TextField>
                    <TextField
                        label="Model"
                        name="model"
                        value={car.model}
                        onChange={handleInputChange}
                    ></TextField>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleSave}>Save</Button>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}