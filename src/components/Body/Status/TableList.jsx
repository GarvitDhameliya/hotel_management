import { Box, Button, Grid, Stack, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import socket from '../../../utils'
import Table from './Table'
import base_url from '../../../constant'
import { DragDropContext } from 'react-beautiful-dnd'
import { Droppable } from 'react-beautiful-dnd'
import { Draggable } from 'react-beautiful-dnd'
import { DragHandleRounded } from '@mui/icons-material'
import { useStyles } from '../../Body/Status/StatusStyle'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'


export const TableList = () => {

    const classes = useStyles();

    const [table, settable] = useState([]);
    const [number, setnumber] = useState("");

    const mySwal = withReactContent(Swal);


    socket.on("listenStatus", (data) => {
        console.log(data);

        table.filter(val =>
            val.tableNo == data.tableNo

        ).forEach((value) => value.status = data.status)
        // console.log(table)
        settable(table)

    })

    const gettable = async () => {
        const response = await fetch(base_url + '/table/getAllLiveTable');
        const data = await response.json();
        settable(data)
    }



    const saveNumber = () => {
        const data = { number: parseInt(number) }
        fetch(base_url + '/table/addLiveTable', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then((result) => {
            result.json().then((res) => {
                console.log(res)
                if (res.message === number + " table added") {
                    mySwal.fire({
                        title: "Table Added",
                        text: "Successfully   ",
                        icon: "success",
                    });
                    gettable();
                    setnumber("");
                }
                else {
                    mySwal.fire({
                        title: " Error",
                        text: "Not Valid   ",
                        icon: "warning",
                    });
                }


            })
        })
    }


    const removeTable = (val) => {
        const data = val;
        fetch(base_url + '/table/deleteLiveTable/' + data, {
            method: 'delete',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ tableNo: data })
        }).then(result => {
            result.json().then(res => {
                const newTable = table.filter(value => { return value.tableNo != data });
                settable(newTable)
            })
        })
    }


    useEffect(() => {
        gettable();
    }, []);

    return (

        <Box sx={{ flexGrow: 1 }}>
            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
                className={classes.addTableBox}
            >

                <Stack spacing={1} direction="row">
                    <TextField id="outlined-basic" label="Add Table" variant="outlined" size='small' value={number} onChange={(e) => setnumber(e.target.value)} />
                    <Button variant="contained" size='small' onClick={saveNumber}>Add</Button>
                </Stack>
            </Box>
            <DragDropContext>
                <Droppable droppableId='table'>
                    {
                        (provided) => (
                            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 24 }} ref={provided.innerRef} {...provided.droppableProps}>
                                {
                                    table.map((value, index) => {
                                        return (
                                            <Grid item xs={2} sm={4} md={3} key={index}>
                                                <Draggable draggableId={"table-" + index} index={index}>
                                                    {
                                                        (provided) => (
                                                            <div ref={provided.innerRef}
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}>
                                                                <DragHandleRounded />
                                                                <Table to={"/" + value.tableNo} number={value.tableNo} status={value.status} />
                                                            </div>
                                                        )
                                                    }
                                                </Draggable>
                                            </Grid>
                                        );

                                    })
                                }

                            </Grid>
                        )
                    }
                </Droppable>
            </DragDropContext>
        </Box>
    )
}
