import { React, useState } from 'react'
import data from "./ListData.json"
import { Link } from "react-router-dom"


function List(props) {

    //create a new array by filtering the original array
    const filteredData = data.filter((el) => {
        //if no input the return the original
        if (props.input === '') {
            return el;
        }
        //return the item which contains the user input
        else {
            return el.text.toLowerCase().includes(props.input)
        }
    })


    return (
        <div align="center" style={{ marginTop:"50px", }} >
            <ul>
                {filteredData.map((item) => (
                    <li key={item.id} style={{ marginBottom:"5px", fontsize:"30px", }} >
                        <Link 
                            to={`/checkpoints/`}
                        >
                        {item.text}</Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}


export default List