import React, { Component } from 'react'
import "./Footer.css";

export default class Footer extends Component {
    render() {
        return (
            <div>
                <footer className="Footer">
                    <div className="content">
                        <div className="left">
                            <h3>React App</h3>
                        </div>
                        <div className="right">
                            <h3>&copy; Copyright 2020</h3>
                        </div>
                    </div>
                </footer>
            </div>
        )
    }
}
