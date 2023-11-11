import { useState, useEffect } from "react";
import { Button, TextField } from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';



export default function EditCar(props) {

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
        props.updateCar(car, props.car._links.car.href);
        handleClose();
    }

    const handleClick = () => {
        setCar({ brand: props.car.brand, model: props.car.model })
        setOpen(true);
    }


    // return
    // addbutton
    //dialogform
    return (
        <>
            <Button onClick={handleClick} variant="container">Edit car</Button>
            <Dialog
                open={open}
                onClose={handleClose}>
                <DialogTitle>Edit Car</DialogTitle>
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