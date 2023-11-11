import { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-material.css'
import { Button } from "@mui/material";
import { Snackbar } from "@mui/material";
import AddCar from "./AddCar";
import EditCar from "./EditCar";



export default function Carlist() {

    //state-variables
    const [cars, setCars] = useState([]);
    const [msg, setMsg] = useState('');
    const [open, setOpen] = useState(false);

    //columns for cars ag-grid
    const columns = [
        { field: 'brand', sortable: true, filter: true, floatingFilter: true, animateRows: true },
        { field: 'model', sortable: true, filter: true, floatingFilter: true, animateRows: true },
        { field: 'color', sortable: true, filter: true, floatingFilter: true, animateRows: true },
        { field: 'fuel', sortable: true, filter: true, floatingFilter: true, animateRows: true },
        { field: 'year', sortable: true, filter: true, floatingFilter: true, animateRows: true },
        { field: 'price', sortable: true, filter: true, floatingFilter: true, animateRows: true },
        {
            cellRenderer: params =>

                <EditCar params={params} car={params.data} updateCar={updateCar} />
            ,
            width: 120
        },
        {
            cellRenderer: params =>
                <Button size="small"
                    color="error"
                    onClick={() => deleteCar(params)}>
                    Delete
                </Button>,
            width: 120
        }
    ]


    useEffect(() => getCars(), [])

    const REST_URL = 'http://carrestapi.herokuapp.com/cars';

    const getCars = () => {
        fetch(REST_URL)
            .then(response => response.json())
            .then(responseData => {
                console.log("responsedata " + responseData._embedded.cars);
                setCars(responseData._embedded.cars);
            })
            .catch(error => {
                console.log(error)
            });
    }

    const deleteCar = (params) => {
        console.log("params: ", params.data._links.car.href)
        fetch(params.data._links.car.href, { method: 'DELETE' })
            .then(response => {
                if (response.ok) {
                    setMsg('Car was deleted succesfully');
                    setOpen(true);
                    getCars();
                } else {
                    alert('Something went wrong!');
                }
            })
            .catch(error => {
                console.log(error)
            });
    }

    const addCar = (car) => {
        //REST API call
        fetch(REST_URL, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(car)
        })
            .then(response => {
                if (response.ok) {
                    getCars();
                    setMsg('Car was saved succesfully')
                    setOpen(true)
                } else
                    alert('Something went wrong while adding a new car')
            })
            .catch(error => console.log(error))
    }

    const updateCar = (car, link) => {
        fetch(link,  {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(car)
        })
            .then(response => {
                if (response.ok) {
                    getCars();
                    setMsg('Information was saved succesfully')
                    setOpen(true)
                } else {
                    console.log(JSON.stringify(car));
                    alert('Something went wrong while editing car')
                }
            })
            .catch(error => console.log(error))
    }

    return (
        <>
            <AddCar addCar={addCar} />

            <div className="ag-theme-material"
                style={{ height: '600px', width: '100%', margin: 'auto' }}>
                <AgGridReact
                    rowData={cars}
                    columnDefs={columns}
                    pagination={true}
                    paginationPageSize={10}>
                </AgGridReact>

                <Snackbar
                    open={open}
                    autoHideDuration={3000}
                    onClose={() => setOpen(false)}
                    message={msg} >
                </Snackbar>

            </div>
        </>
    );
}