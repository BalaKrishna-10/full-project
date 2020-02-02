import React, { Component } from 'react'
import NavImage from "./NavImage";
import Footer from './Footer';
import Contentbox from './Contentbox';

export class Home extends Component {
    render() {
        return (
            <div>
                 <NavImage/>
        <Contentbox/>
        <Footer/>
            </div>
        )
    }
}

export default Home
 