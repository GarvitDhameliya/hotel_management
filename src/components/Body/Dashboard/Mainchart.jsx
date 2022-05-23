import React, { useState, useEffect } from 'react'
import { ResponsiveContainer, LineChart, Line, Tooltip, XAxis, YAxis, BarChart, Bar, Legend, CartesianGrid } from 'recharts'
import base_url from '../../../constant';




const Mainchart = () => {
    // const data = [
    //     {
    //         itemName: 'khaman',
    //         totalorder: 20,

    //     },
    //     {
    //         itemName: 'khandvi',
    //         totalorder: 25,
    //     },
    //     {
    //         itemName: 'panjabi',
    //         totalorder: 10,
    //     },
    //     {
    //         itemName: 'dal bati',
    //         totalorder: 50,
    //     },
    //     {
    //         itemName: 'manchuriyan',
    //         totalorder: 14,
    //     },
    // ]

    const [OrderChart, setOrderChart] = useState({ detail: {}, DataisLoaded: false });


    const getOrderChart = async () => {

        const response = await fetch(base_url + "/order/getOrderItemCustomDay/30");
        const data = await response.json()
        return data;

    }




    useEffect(() => {
        getOrderChart()
            .then(result => {
                setOrderChart({ detail: result.message, DataisLoaded: true });
            })
    }, [])




    if (OrderChart.DataisLoaded == true) {


        console.log(OrderChart.detail)
        return (
            <>
                <div className='container'>
                    <div className='col-md-12'>
                        <ResponsiveContainer aspect={3}>
                            <BarChart
                                width={500}
                                height={500}
                                data={OrderChart.detail}
                                margin={{
                                    top: 20,
                                    right: 30,
                                    left: 20,
                                    bottom: 5,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis dataKey="quantity" />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="item" stackId="a" fill="#8884d8" />
                                <Bar dataKey="quantity" stackId="a" fill="#8884d8" />


                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </>
        )
    }
    else {
        return (
            <>
                Something went wrong
            </>
        )
    }

}

export default Mainchart