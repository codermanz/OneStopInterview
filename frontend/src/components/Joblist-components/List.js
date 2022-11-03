import { React, useState } from 'react'
import data from "./ListData.json"
import { Link } from 'react-router-dom';
import { browserHistory, Routes, Route, Router } from 'react-router'


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

    const UserPage = ({ match, location }) => {
        return (
            <h3>hello</h3>
        )
      };

     const Routing = () => {
        return (
          <>
            <Router>
              <Route path="/resume-tips/:jobId" component={UserPage} />
            </Router>
          </>
        );
      };

    return (
        <div align="center" style={{ marginTop:"50px", }} >
            <ul>
                {filteredData.map((item) => (
                    <li key={item.id} style={{ marginBottom:"5px", fontsize:"30px", }} >
                        <Link to={`/resume-tips/${item.id}`}>{item.text}</Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default List