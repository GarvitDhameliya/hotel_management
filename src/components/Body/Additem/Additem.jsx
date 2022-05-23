import { Button, MenuItem, TextField } from '@mui/material';
import React, { useState, useEffect } from 'react'
import base_url from '../../../constant';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const Additem = () => {

    const [Category, setCategory] = useState({ detail: {}, DataisLoaded: false })

    const [name, setname] = useState("");
    const [category, setcategory] = useState("");
    const [price, setprice] = useState("");

    const mySwal = withReactContent(Swal)

    const getcategory = async () => {
        const response = await fetch(base_url + '/category');
        const data = await response.json();
        return data;
    }

    const saveItem = () => {
        console.log({ category, name, price })
        let data = { category, name, price };
        fetch(base_url + '/item/addItem', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then((result) => {
            result.json().then((res) => {
                console.log(res)
                if (res.message === "Item Added") {
                    getcategory().then(result => {
                        setCategory({ detail: result.message, DataisLoaded: true })
                    })
                    mySwal.fire({
                        title: "Item Added",
                        text: "Successfully   ",
                        icon: "success",
                    });

                }
                else if (res.message === "Duplication Error") {
                    mySwal.fire({
                        title: "Duplication Error",
                        text: "Not Valid   ",
                        icon: "warning",
                    });
                }
                else {
                    mySwal.fire({
                        title: "Opps.. !",
                        text: "Not Valid   ",
                        icon: "error",
                    });
                }
            })
        })


    }

    useEffect(() => {
        getcategory()
            .then(result => {
                setCategory({ detail: result.message, DataisLoaded: true })
            })
    }, []);

    return (
        <form className="border-right p-3">
            <h3 className="text-center m-4">Add Item</h3>
            <div className="form-group m-3">
                <TextField id="text" type="text" label="Add Item Name" variant="outlined" name="itemname" value={name} onChange={(e) => setname(e.target.value)} />
            </div>
            <div className="form-group m-3">
                <TextField id="number" type="number" label="Add Item Price" variant="outlined" name="itemprice" value={price} onChange={(e) => setprice(e.target.value)} />
            </div>
            <div className="form-group m-3">
                <TextField
                    id="outlined-select"
                    select
                    label="Select Category"
                    value={category}
                    onChange={(e) => setcategory(e.target.value)}
                    helperText="Please select your category"
                >
                    {
                        Category.DataisLoaded === true &&
                        Category.detail.map(val => <MenuItem key={val._id} value={val._id}>{val.name}</MenuItem>)
                    }
                </TextField>
            </div>
            <div className="form-group m-3 text-center">
                <Button variant="contained" onClick={saveItem}>Add</Button>
            </div>
        </form>

    )
}

export default Additem