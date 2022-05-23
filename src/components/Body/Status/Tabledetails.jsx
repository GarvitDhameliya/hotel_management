import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom';
import base_url from "../../../constant";
import Button from '@mui/material/Button'
import Modal from './modal'
import { TextField } from '@mui/material';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import socket from '../../../utils'



const Tabledetails = () => {


    const [sgst, setsgst] = useState("");
    const [cgst, setcgst] = useState("");
    const [tex, settex] = useState("");
    const [discount, setdiscount] = useState(0);
    const mySwal = withReactContent(Swal)

    let sub_total = 0;
    let Mtax = 0;
    let Msgst = 0;
    let Mcgst
    let total = 0;
    let orders = [];
    let finalTotal = 0
    let payment_method = "ofline"


    const params = useParams();
    const tableNo = params.id;
    const [table, settable] = useState({ detail: {}, DataisLoaded: false });
    const [isOpen, setIsOpen] = useState(false);



    const gettable = async () => {

        const response = await fetch(base_url + '/table/getTableNumber/' + tableNo);
        const data = await response.json()
        return data;
    }

    const togglePopup = () => {
        setIsOpen(!isOpen);
    }

    const gettax = async () => {
        const response = await fetch(base_url + '/setting/tex');
        const data = await response.json();
        // console.log(data)
        return data
    }


    const Savepayment = async () => {

        let customer_id = table.detail.customer._id

        const data = {
            "tableNo": tableNo,
            "orders": orders,
            "amount": finalTotal,
            "customer_id": customer_id,
            "method": payment_method,
            "discount": discount
        }

        fetch(base_url + '/bill/generateBill', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then((result) => {
            result.json().then((res) => {
                socket.emit("change_table_status", { tableNo: tableNo, status: "Free" })
                console.log(res)
                if (res.message.acknowledged === true) {
                    mySwal.fire({
                        title: `${finalTotal} Rupee Paid`,
                        text: "Successfully   ",
                        icon: "success",
                    });

                    setsgst(0)
                    setcgst(0)
                    settex(0)
                    setdiscount(0)
                    settable({ detail: {}, DataisLoaded: true })

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
        gettable()
            .then(result => {
                settable({ detail: result.message, DataisLoaded: true })
            })

        gettax().then(data => {
            // console.log(data)
            setsgst(data.message[0].gst_tex.sgst)
            setcgst(data.message[0].gst_tex.cgst)
            settex(data.message[0].tex)
        })
    }, []);




    if (table.DataisLoaded === true) {
        return (
            <>

                <table className="table table-striped table-bordered  m-3 bg-white">
                    <thead>
                        <tr>
                            <th scope="col">Number</th>
                            <th scope="col">Order</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Status</th>
                            <th scope="col">Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {

                            table.detail.order.map((val, ind) => {
                                orders.push(val._id)
                                sub_total += val.item.price * val.quantity;
                                Msgst = (sub_total * sgst) / 100;
                                Mtax = (sub_total * tex) / 100;
                                Mcgst = (sub_total * cgst) / 100;
                                total = sub_total + Msgst + Mcgst + Mtax
                                finalTotal = total - discount;


                                return (
                                    <tr key={val._id}>
                                        <th scope="row">{ind + 1}</th>
                                        <td>{val.item.name}</td>
                                        <td>{val.quantity}</td>
                                        <td>{val.status}</td>
                                        <td>{val.item.price * val.quantity}</td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                    <tfoot>
                        <tr>
                            <td>Total Bill</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>{sub_total}</td>
                        </tr>
                        <tr>
                            <td>Create Bill</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td><Button
                                variant="contained"
                                color="success"
                                size="small"
                                onClick={togglePopup}
                                className="button-default">
                                Bill
                            </Button></td>
                        </tr>
                    </tfoot>
                </table>


                {isOpen && <Modal
                    content=
                    {<>

                        <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" />

                        <div className="page-content container">
                            <div className="page-header text-blue-d2">
                                <h1 className="page-title text-secondary-d1">
                                    Invoice

                                </h1>

                                <div className="page-tools">
                                    <div className="action-buttons">
                                        <a className="btn bg-white btn-light mx-1px text-95" href="#" data-title="Print">
                                            <i className="mr-1 fa fa-print text-primary-m1 text-120 w-2"></i>
                                            Print
                                        </a>
                                        <a className="btn bg-white btn-light mx-1px text-95" href="#" data-title="PDF">
                                            <i className="mr-1 fa fa-file-pdf-o text-danger-m1 text-120 w-2"></i>
                                            Export
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <div className="container px-0">
                                <div className="row mt-4">
                                    <div className="col-12 col-lg-12">
                                        <div className="row">
                                            <div className="col-12">
                                                <div className="text-center text-150">
                                                    <i className="fa fa-book fa-2x text-success-m2 mr-1"></i>
                                                    <span className="text-default-d3">Hotel Management System</span>
                                                </div>
                                            </div>
                                        </div>


                                        <hr className="row brc-default-l1 mx-n1 mb-4" />

                                        <div className="row">

                                            <div className="col-sm-6">
                                                <div>
                                                    <span className="text-sm text-grey-m2 align-middle">To:</span>
                                                    <span className="text-600 text-110 text-blue align-middle">{table.detail.customer.name}</span>
                                                </div>
                                                <div className="text-grey-m2">

                                                    <div className="my-1"><i className="fa fa-phone fa-flip-horizontal text-secondary"></i> <b className="text-600">{table.detail.customer.mobileNo}</b></div>
                                                </div>
                                            </div>

                                            <div className="text-95 col-sm-6 align-self-start d-sm-flex justify-content-end">
                                                <hr className="d-sm-none" />
                                                <div className="text-grey-m2">
                                                    <div className="mt-1 mb-2 text-secondary-m1 text-600 text-125">
                                                        Invoice
                                                    </div>

                                                    <div className="my-2"><i className="fa fa-circle text-blue-m2 text-xs mr-1"></i> <span className="text-600 text-90">Issue Date: {new Date().toLocaleDateString()}</span></div>


                                                </div>
                                            </div>

                                        </div>
                                        <form>
                                            <div className="mt-4">

                                                <div className="row border-b-2 brc-default-l2"></div>


                                                <div className="table-responsive">
                                                    <table className="table table-striped table-borderless border-0 border-b-2 brc-default-l1">
                                                        <thead className="bg-none bgc-default-tp1">
                                                            <tr className="text-white">
                                                                <th className="opacity-2">#</th>
                                                                <th>Description</th>
                                                                <th>Qty</th>
                                                                <th>Unit Price</th>
                                                                <th width="140">Amount</th>
                                                            </tr>
                                                        </thead>

                                                        <tbody className="text-95 text-secondary-d3">
                                                            <tr></tr>
                                                            {

                                                                table.detail.order.map((val, ind) => {


                                                                    return (
                                                                        <tr key={val._id}>
                                                                            <th scope="row">{ind + 1}</th>
                                                                            <td>{val.item.name}</td>
                                                                            <td>{val.quantity}</td>
                                                                            <td>{val.status}</td>
                                                                            <td>{val.item.price * val.quantity}</td>
                                                                        </tr>
                                                                    );
                                                                })
                                                            }
                                                        </tbody>
                                                    </table>
                                                </div>

                                                <div className="row mt-3">
                                                    <div className="col-12 col-sm-7 text-grey-d2 text-95 mt-2 mt-lg-0">
                                                        Extra note such as company or payment information...
                                                    </div>

                                                    <div className="col-12 col-sm-5 text-grey text-90 order-first order-sm-last">
                                                        <div className="row my-2">
                                                            <div className="col-7 text-right">
                                                                SubTotal
                                                            </div>
                                                            <div className="col-5">
                                                                <span className="text-120 text-secondary-d1">{sub_total}</span>
                                                            </div>
                                                        </div>

                                                        <div className="row my-2">
                                                            <div className="col-7 text-right">
                                                                SGST {sgst}%
                                                            </div>
                                                            <div className="col-5">
                                                                <span className="text-110 text-secondary-d1">{Msgst}</span>
                                                            </div>
                                                        </div>
                                                        <div className="row my-2">
                                                            <div className="col-7 text-right">
                                                                CGST {cgst}%
                                                            </div>
                                                            <div className="col-5">
                                                                <span className="text-110 text-secondary-d1">{Mcgst}</span>
                                                            </div>
                                                        </div>
                                                        <div className="row my-2">
                                                            <div className="col-7 text-right">
                                                                Tax {tex}%
                                                            </div>
                                                            <div className="col-5">
                                                                <span className="text-110 text-secondary-d1">{Mtax}</span>
                                                            </div>
                                                        </div>


                                                        <div className="row my-2">
                                                            <div className="col-7 text-right">
                                                                Discount
                                                            </div>
                                                            <div className="col-5">
                                                                <TextField id="Discount" type="number" label="Discount" variant="outlined" name="discount" size='small' value={discount} onChange={(e) => setdiscount(e.target.value)} />
                                                            </div>
                                                        </div>


                                                        <div className="row my-2 align-items-center bgc-primary-l3 p-2">
                                                            <div className="col-7 text-right">
                                                                Total Amount
                                                            </div>
                                                            <div className="col-5">
                                                                <span className="text-150 text-success-d3 opacity-2">{total
                                                                }</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <hr />

                                                <div>
                                                    <span className="text-secondary-d1 text-105">Thank you for your business</span>
                                                    <a href="#" className="btn btn-info btn-bold px-4 float-right mt-3 mt-lg-0" onClick={Savepayment}>Pay Now</a>
                                                </div>

                                            </div>
                                        </form>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </>}
                    handleClose={togglePopup}
                />}
            </>
        );

    }
    else if (table.DataisLoaded === false) {
        return (
            <p>Something went wrong</p>
        );
    }
}

export default Tabledetails;