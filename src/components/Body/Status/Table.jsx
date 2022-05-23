import { Card, CardContent, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import { useStyles } from '../../Body/Status/StatusStyle'

const Table = (props) => {

    const classes = useStyles();
    return (
        <Link to={props.to} style={{ textDecoration: 'none' }} className={classes.tableCard}>
            <Card sx={{ minWidth: 80 }} className={props.status === "Free" ? " card border-success  text-dark"
                : props.status === "Payment" ? " card border-warning"
                    : " card bg-danger text-white"}>
                <CardContent>
                    <Typography align='center'>{props.number}</Typography>
                </CardContent>
            </Card>
        </Link >
    )
}

export default Table