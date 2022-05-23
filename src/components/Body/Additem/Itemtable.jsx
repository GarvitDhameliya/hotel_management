import React, { useEffect, useState } from 'react'
import base_url from '../../../constant'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const Itemtable = () => {

    const [item, setitem] = useState({ detail: {}, DataisLoaded: false })
    const [selCategory, setselCategory] = useState("All");
    const [price, setprice] = useState(0);
    const mySwal = withReactContent(Swal)

    const [name, setname] = useState("")
    const getallitem = async () => {
        const response = await fetch(base_url + '/item/allItem');
        const data = await response.json();
        return data;
    }

    const editItem = (itemname, itemprice, itemid) => {

        console.log(itemname, itemprice, itemid);

        let data = {
            "id": itemid,
            "name": name,
            "price": price
        }

        fetch(base_url + '/item/update/', {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then((result) => {
            console.log(result)
            if (result.status == 200) {
                mySwal.fire({
                    title: "Item Edited",
                    text: "Successfully   ",
                    icon: "success",
                });
            }
            else if (result.status == 400) {
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

    const removeItem = (id) => {
        let data = {
            "_id": id,
        }
        fetch(base_url + '/item/itemdelete', {
            method: 'delete',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(result => {
            result.json().then(res => {
                if (result.status == 200) {
                    getallitem().then(result => {
                        setitem({ detail: result.message, DataisLoaded: true })
                    })
                    mySwal.fire({
                        title: "Item Deleted",
                        text: "Successfully   ",
                        icon: "success",
                    });
                }
                else if (result.status == 400) {
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
        })
    }


    useEffect(() => {
        getallitem()
            .then(result => {
                setitem({ detail: result.message, DataisLoaded: true })
            })
    }, []);
    if (item.DataisLoaded == true) {

        return (
            <div className="col-md-12">

                <select className="browser-default custom-select mb-1" onChange={(e) => setselCategory(e.target.value)}>
                    <option defaultValue>All</option>
                    {item.detail.map((val, ind) => {
                        return (
                            <option key={ind} value={val.category}>{val.category}</option>
                        );
                    })}
                </select>
                <hr />

                {
                    item.detail.map((val, ind) => {

                        return (

                            selCategory == 'All' ?
                                <div className="mb-4" key={ind} >
                                    <div className="card-header bg-dark text-white">
                                        {val.category}
                                    </div>

                                    <table className="table col-md-12">
                                        <tbody>
                                            {val.value.map((val2, ind) => {
                                                return (

                                                    <tr key={ind}>
                                                        <th scope="row">{ind + 1}</th>
                                                        <td><input type="text" className='form-control' defaultValue={val2.name} onChange={(e) => setname(e.target.value)} /></td>
                                                        <td><input type="number" className='form-control' defaultValue={val2.price} onChange={(e) => setprice(e.target.value)} /></td>
                                                        <td>{val2.available}</td>
                                                        <td>
                                                            <button className='btn btn-success mr-2' type='submit' onClick={() => editItem(name, price, val2._id)}><i className="fa fa-pencil" aria-hidden="true" ></i></button>
                                                            <button className='btn btn-danger' type='submit' onClick={() => removeItem(val2._id)}><i className="fa fa-trash" aria-hidden="true"></i></button>
                                                        </td>
                                                    </tr>

                                                );
                                            })}

                                        </tbody>
                                    </table>

                                </div> : selCategory === val.category ? <div className="mb-4" >
                                    <div className="card-header bg-dark text-white">
                                        {val.category}
                                    </div>

                                    <table className="table col-md-12">
                                        <tbody>
                                            {val.value.map((val2, ind) => {

                                                return (

                                                    <tr key={ind}>
                                                        <th scope="row">{ind + 1}</th>
                                                        <td><input type="text" className='form-control' defaultValue={val2.name} onChange={(e) => setname(e.target.value)} /></td>
                                                        <td><input type="number" className='form-control' defaultValue={val2.price} onChange={(e) => setprice(e.target.value)} /></td>
                                                        <td>{val2.available}</td>
                                                        <td>
                                                            <button className='btn btn-success mr-2' type='submit' onClick={() => editItem(name, price, val2._id)}><i className="fa fa-pencil" aria-hidden="true" ></i></button>
                                                            <button className='btn btn-danger' type='submit' onClick={() => removeItem(val2._id)}><i className="fa fa-trash" aria-hidden="true"></i></button>
                                                        </td>
                                                    </tr>


                                                );
                                            })}

                                        </tbody>
                                    </table>
                                </div> : " "

                        );
                    })
                }

            </div >


        )
    }
    else {
        return (
            <p>Wrong</p>
        )
    }
}

export default Itemtable