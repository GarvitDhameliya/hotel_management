import React from 'react'
import Additem from './Additem'
import Itemtable from './Itemtable'
import { useStyles } from './itemStyle'
import Addcategory from './Addcategory'

const AddItemComponent = () => {
    const classes = useStyles();

    

    return (
        <div className='row col-md-12 container-fluid d-flex'>
            <div className='col-md-3'>
                <Additem />
                <hr />
                <Addcategory />
            </div>
            <div className='col-md-9'>
                <h4 className='mb-3'>Item List</h4>
                <Itemtable />
            </div>
        </div>


    )
}

export default AddItemComponent;