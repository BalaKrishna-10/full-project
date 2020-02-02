import React, { Component } from 'react'
import "./Accountlinks.css";
import "./Mediaquery.css";
import Edit from './Edit';

export default class Accountlinks extends Component {
    render() {
        return (
            <div>
                <div className="main-account">
                    <div className="head"><h3>Account Links</h3>
                    <hr></hr>
                    </div>
                    
                    <div className="list">
                        <ul>
                            <li><a onClick={<Edit />}>Profile</a></li>
                            <li><a href="/">Edit Profile</a></li>
                            
                        </ul>
                    </div>
                    
                </div>
            </div>
        )
    }
}
