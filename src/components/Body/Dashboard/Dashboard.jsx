import React, { useEffect, useState } from 'react'
import base_url from '../../../constant';
import Mainchart from './Mainchart'
import './style.css'
import socket from '../../../utils'

const Dashboard = () => {


    const [tabledetail, settabledetail] = useState({ detail: {}, dataIsLoaded: false });

    const [billAmount, setbillAmount] = useState({ detail: {}, dataIsLoaded: false })

    const gettabledetail = async () => {

        const response = await fetch(base_url + '/table/getAllLiveTable');
        const data = await response.json()
        return data;
    }

    const getBillAmount = async () => {

        const response = await fetch(base_url + '/Bill/getBillAmount/30');
        const data = await response.json()
        return data;
    }

    socket.on("listenStatus", (result) => {
        // console.log(result, "sssssssssssssssssssssss")
        const free = result.freeTable
        const total = result.totalTable;
        const occ = result.accTable;

        settabledetail({ detail: { free, total, occ }, dataIsLoaded: true })


    })

    useEffect(() => {
        gettabledetail()
            .then(result => {
                const free = result.filter(ele => ele.status == "Free").length
                const total = result.length;
                const occ = total - free;

                settabledetail({ detail: { free, total, occ }, dataIsLoaded: true })
            })


        getBillAmount()
            .then(result => {
                setbillAmount({ detail: { tm: result.total_amount, tc: result.total_cash, to: result.total_online }, dataIsLoaded: true })
            })


    }, []);


    return (
        <>
            <div className='container'>
                <div className="row mt-5">
                    <div className="col-md-3">
                        <div className="main-card mb-3 card">
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">
                                    <div className="widget-content p-0">
                                        <div className="widget-content-outer">
                                            <div className="widget-content-wrapper">
                                                <div className="widget-content-left">
                                                    <div className="widget-heading">Total Tables</div>
                                                    <div className="widget-subheading"></div>
                                                </div>
                                                <div className="widget-content-right">
                                                    <div className="widget-numbers text-success">{tabledetail.dataIsLoaded == true ? tabledetail.detail.total : 0}</div>
                                                </div>
                                            </div>
                                            <div className="widget-progress-wrapper">

                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li className="list-group-item">
                                    <div className="widget-content p-0">
                                        <div className="widget-content-outer">
                                            <div className="widget-content-wrapper">
                                                <div className="widget-content-left">
                                                    <div className="widget-heading">Busy Table</div>
                                                    <div className="widget-subheading"></div>
                                                </div>
                                                <div className="widget-content-right">
                                                    <div className="widget-numbers text-primary">{tabledetail.dataIsLoaded == true ? tabledetail.detail.occ : 0}</div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </li>
                                <li className="list-group-item">
                                    <div className="widget-content p-0">
                                        <div className="widget-content-outer">
                                            <div className="widget-content-wrapper">
                                                <div className="widget-content-left">
                                                    <div className="widget-heading">Free Table</div>

                                                </div>
                                                <div className="widget-content-right">
                                                    <div className="widget-numbers text-danger">{tabledetail.dataIsLoaded == true ? tabledetail.detail.free : 0}</div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-md-9">
                        <div className="main-card mb-3 card">
                            <div className="card-body">
                                <ul className="list-group">
                                    <li className="list-group-item">
                                        <div className="widget-content p-0">
                                            <div className="widget-content-outer">
                                                <div className="widget-content-wrapper">
                                                    <div className="widget-content-left">
                                                        <div className="widget-heading">Total Amount</div>
                                                        <div className="widget-subheading">Today</div>
                                                    </div>
                                                    <div className="widget-content-right">
                                                        <div className="widget-numbers text-success">{billAmount.dataIsLoaded == true ? parseInt(billAmount.detail.tm) : 0}₹</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="list-group-item">
                                        <div className="widget-content p-0">
                                            <div className="widget-content-outer">
                                                <div className="widget-content-wrapper">
                                                    <div className="widget-content-left">
                                                        <div className="widget-heading">Cash</div>
                                                        <div className="widget-subheading">Payment Type</div>
                                                    </div>
                                                    <div className="widget-content-right">
                                                        <div className="widget-numbers text-primary">{billAmount.dataIsLoaded == true ? parseInt(billAmount.detail.tc) : 0}₹</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="list-group-item">
                                        <div className="widget-content p-0">
                                            <div className="widget-content-outer">
                                                <div className="widget-content-wrapper">
                                                    <div className="widget-content-left">
                                                        <div className="widget-heading">Online</div>
                                                        <div className="widget-subheading">Payment Type</div>
                                                    </div>
                                                    <div className="widget-content-right">
                                                        <div className="widget-numbers text-danger">{billAmount.dataIsLoaded == true ? parseInt(billAmount.detail.to) : 0}₹</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='container mt-5 row'>
                    <Mainchart />
                </div>

            </div>
        </>
    )
}

export default Dashboard