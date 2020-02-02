import React, { Component } from 'react'
import Navbar from './Navbar'
import Heroimage from "./Images/Heroimage.jpeg";
import "./NavImage.css";

export default class NavImage extends Component {
    render() {
        return (
            <div >
                <Navbar/>
             <div className="Heroimage">
                 <img src={Heroimage} alt="preview"/>
             </div>
            </div>
        )
    }
}
