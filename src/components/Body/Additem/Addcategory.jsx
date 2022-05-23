import { Button, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import base_url from '../../../constant';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const Addcategory = () => {

    const [name, setname] = useState("");
    const [category, setcategory] = useState("");

    const mySwal = withReactContent(Swal)

    const getcategory = async () => {
        const response = await fetch(base_url + '/category');
        const data = await response.json();
        return data;
    }

    const saveCategory = () => {
        console.log({ name })
        let data = { name };

        fetch(base_url + '/category/addCategory', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then((result) => {
            result.json().then((res) => {
                console.log(res)
                if (res.message === "Category Added") {
                    getcategory()
                        .then(result => {
                            setcategory({ detail: result.message, DataisLoaded: true })
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
                category({ detail: result.message, DataisLoaded: true })
            })
    }, []);

    return (
        <form className="border-right p-3">
            <h3 className="text-center m-4">Add Category</h3>
            <div className="form-group m-3">
                <TextField id="text" type="text" label="Add Item Name" variant="outlined" name="name" defaultvalue={name} onChange={(e) => setname(e.target.value)} />
            </div>
            <div className="form-group m-3 text-center">
                <Button variant="contained" onClick={saveCategory}>Add</Button>
            </div>
        </form>
    )
}

export default Addcategory