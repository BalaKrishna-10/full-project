import React, { Component } from 'react'
import Navbar from './Navbar'
import Detail from './Detail'
import "./Profile.css";
import Edit from './Edit'
import Footer from './Footer'
import "./Mediaquery.css";


export default class Profile extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             view: "detail",
        }
    
        this.clickeditHandler = this.clickeditHandler.bind(this);
        this.clickDetailHandler = this.clickDetailHandler.bind(this);
    }
    clickDetailHandler (e) {
        e.preventDefault()
        this.setState({view:"detail"})
    }
    clickeditHandler (e) {
        e.preventDefault()
        this.setState({view:"edit"})
    }
    render() {
        if(this.state.view === "detail"){
            var Page = <div><Detail/></div>
        }
        if(this.state.view === "edit"){
             Page = <div className="col-5"><Edit /> </div>
        }
        return (
            <div className="profile"> 
               <header>
                <Navbar />
                </header>
            
                <mainbody id="mainbody">
                <div className="grid-pro">
                    <div className="col-5"> <div className="main-account">
                    <div className="head"><h3>Account Links</h3>
                    <hr></hr>
                    </div>
                    
                    <div className="list">
                        <ul>
                            <li><a onClick={this.clickDetailHandler} style={{cursor:"pointer"}}>Profile</a></li>
                            <li><a onClick={this.clickeditHandler} style={{cursor:"pointer"}}>Edit Profile</a></li>
                            
                        </ul>
                    </div>
                    
                </div></div>
                    {/* <div><Detail/></div> */}
                    {/* <div className="col-5">{this.props.detailPage} </div> */}
                    {Page}
              </div>
              </mainbody>
              
              
              <Footer/>
               
              </div>
                
            
        )
    }
}
