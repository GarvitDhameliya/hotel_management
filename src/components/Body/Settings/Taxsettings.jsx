import { Button, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import base_url from '../../../constant'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'


const Taxsettings = () => {

    const [sgst, setsgst] = useState("");
    const [cgst, setcgst] = useState("");
    const [tex, settex] = useState("");

    const mySwal = withReactContent(Swal)

    const SaveTax = () => {
        let data = {
            "setting_detail": "tex",
            "detail": {
                "gst_tex": {
                    sgst, cgst
                },
                tex
            }
        };
        console.log(data)

        fetch(base_url + '/setting/tex', {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then((result) => {



            if (result.status == 200) {

                mySwal.fire({
                    title: "Item Added",
                    text: "Successfully   ",
                    icon: "success",
                });
            }
            else if (result.status == 500) {
                mySwal.fire({
                    title: "Server Error",
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
    }

    const gettax = async () => {
        const response = await fetch(base_url + '/setting/tex');
        const data = await response.json();
        console.log(data)
        return data
    }


    useEffect(() => {
        gettax().then(data => {
            console.log(data)
            setsgst(data.message[0].gst_tex.sgst)
            setcgst(data.message[0].gst_tex.cgst)
            settex(data.message[0].tex)
        })
    }, []);

    return (

        <div>
            <form className="border-right p-3">
                <h3 className=" m-4">Tax Setting</h3>
                <div className="form-group m-3">
                    <TextField id="number" type="number" label="Add SGST %" variant="outlined" name="sgst" size='small' value={sgst} onChange={(e) => setsgst(e.target.value)} />
                </div>
                <div className="form-group m-3">
                    <TextField id="number" type="number" label="Add CGST %" variant="outlined" name="cgst" size='small' value={cgst} onChange={(e) => setcgst(e.target.value)} />
                </div>
                <div className="form-group m-3">
                    <TextField id="number" type="number" label="Add TAX %" variant="outlined" name="tex" size='small' value={tex} onChange={(e) => settex(e.target.value)} />
                </div>
                <div className="form-group m-3">
                    <Button variant="contained" onClick={SaveTax}>Save</Button>
                </div>
            </form>
        </div>

    )
}

export default Taxsettings