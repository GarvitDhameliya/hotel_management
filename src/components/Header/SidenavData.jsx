import { Button, List, ListItem, ListItemIcon, ListItemText } from '@mui/material'
import DashboardIcon from '@mui/icons-material/Dashboard';
import BorderAllIcon from '@mui/icons-material/BorderAll';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import React from 'react'
import { Link } from 'react-router-dom';
import { useStyles } from './HeaderStyle';

export default function SidenavData({ handleDrawerClose }) {


    // let react_url = "http://65.2.127.123:8080";
    const classes = useStyles();

    const listData = [
        { label: "Dashboard", link: '/', icon: <DashboardIcon /> },
        { label: "Status", link: '/status', icon: <BorderAllIcon /> },
        { label: "Add Item", link: '/additem', icon: <AddCircleIcon /> },
        { label: "Settings", link: '/settings', icon: <SettingsIcon /> }
    ]
    return (
        <List>
            {
                listData.map((ele, i) => {
                    return (
                        <Link to={ele.link} className={classes.navlink} style={{ textDecoration: 'none' }} key={i}>
                            <Button size="small" className={classes.navButton} onClick={() => handleDrawerClose()} >
                                <ListItem>
                                    <ListItemIcon>{ele.icon}</ListItemIcon>
                                    <ListItemText>{ele.label}</ListItemText>
                                </ListItem>
                            </Button>
                        </Link>
                    )
                })
            }
        </List>
    )
}
