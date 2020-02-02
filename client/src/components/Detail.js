import React, { Component } from 'react'
import "./Detail.css";
import Navbar from './Navbar'
import Footer from './Footer'
import "./Mediaquery.css";
import "./Profile.css";


export default class Detail extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             name:"",
             email:"",
             phone:"",
             address:"",
             dateofbirth:"",
             image:"",
             user:[]
        }
    }
    
    componentDidMount(){
        const userId = localStorage.getItem('userId')
        fetch('http://localhost:3001/user/getuser/'+userId)
        .then(res => {
            if(res.status !== 200){
                throw new Error('Failed to fetch product');
            }
            return res.json();
        })
        .then(resData => {
            this.setState({
                name:resData.user.name,
                email:resData.user.email,
                phone:resData.user.phone,
                address:resData.user.address,
                dateofbirth:resData.user.dateofbirth,
                image:'http://localhost:3001/' + resData.user.image
                // user:resData.user

            })
            console.log(this.state)
        })
    }
    render() {
        return (
            <div className="profile"> 
            <header>
             <Navbar />
             </header>
         
            <div className="detailcontainer">
                <div className="detail">
                    <div><h3>My profile</h3>
                    <hr></hr></div>
                    <div className="table">
                    <table className="col-2">
                        <div>
                        <tr>
                            <td>Full Name</td>
                            <td><span id="data"> {this.state.name} </span></td>
                       </tr>

                       <tr>
                            <td>Phone</td>
                            <td><span id="data">{this.state.phone}</span></td>

                       </tr>

                       <tr>
                            <td>Address</td>
                            <td><span id="data">{this.state.address} </span> </td>
                       </tr>

                       <tr>
                            <td>Email</td>
                            <td><span id="data">{this.state.email}</span></td>
                       </tr>

                       <tr>
                            <td>DOB</td>
                            <td><span id="data">{this.state.dateofbirth}</span></td>
                       </tr>
                       </div>
                     
                           <img className="img" src={this.state.image}></img>
                       
                    </table>

                    </div>
                </div>
                             
               </div>
               <Footer />
            </div>
        )
    }
}
