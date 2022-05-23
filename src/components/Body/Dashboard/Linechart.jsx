import React, { useEffect, useState } from 'react'
import { ResponsiveContainer, LineChart, Line, Tooltip } from 'recharts'
import base_url from '../../../constant'

const data = [
    {
        itemName: 'khaman',
        totalorder: 20,

    },
    {
        itemName: 'khandvi',
        totalorder: 25,
    },
    {
        itemName: 'panjabi',
        totalorder: 10,
    },
    {
        itemName: 'dal bati',
        totalorder: 50,
    },
    {
        itemName: 'manchuriyan',
        totalorder: 14,
    },
]



const Linechart = () => {



    return (
        <>

            <div className='card bg-light'>
                <ResponsiveContainer width="100%" aspect={3}>
                    <LineChart data={data}>
                        <Line dataKey="totalorder" />
                        <Tooltip />
                    </LineChart>
                </ResponsiveContainer>
            </div>

        </>
    )
}

export default Linechart