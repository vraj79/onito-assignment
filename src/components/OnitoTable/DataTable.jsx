// import { Box } from '@chakra-ui/react';
import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import $ from "jquery";
import "datatables.net-dt"
import "../../App.css"
import { Heading } from '@chakra-ui/react';

const getFormData = async () => {
    let res = await axios.get("https://mocknine.onrender.com/users");
    console.log(res.data);
    return res.data
}

const FormDataTable = () => {
    const [data, setData] = useState([]);
    const ref = useRef()

    useEffect(() => {
        getFormData().then(res => setData(res));
    }, [])

    useEffect(() => {
        if (data.length > 0) {
            $(ref.current).ready(function () {
                $('#example').DataTable();
            });
        }
    }, [data]);


    return (
        <div ref={ref}>
            <Heading>Data Table</Heading>
            <table id='example' >
                <thead >
                    <tr>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Sex</th>
                        <th>Mobile</th>
                        <th>Address</th>
                        <th>Govt ID Type</th>
                        <th>Govt ID Number</th>
                        <th>Guardian Name</th>
                        <th>Nationality</th>
                    </tr>
                </thead>
                <tbody style={{ textTransform: "capitalize" }}>
                    {data.map((ele) => {
                        return (
                            <tr key={ele.id}>
                                <th>{ele.name}</th>
                                <th>{ele.age}</th>
                                <th>{ele.sex}</th>
                                <th>{ele.mobile}</th>
                                <th>{ele.address}</th>
                                <th style={{ textTransform: "uppercase" }}>{ele.goi}</th>
                                <th>{ele.goiNum}</th>
                                <th>{ele.guardianName}</th>
                                <th>{ele.nationality}</th>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>

    )
}

export default FormDataTable