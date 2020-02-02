import React, { Component } from 'react'
import "./Signup.css";
import Navbar from './Navbar';
import Footer from './Footer';

export default class Signup extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            image:"",
            name:"",
             email:"",
             password:"",
             phone:"",
             address:"",
             dateofbirth:"",
             question1:"",
             question2:"",
             question3:"",
             previewImg:"",
             error:""
        }
        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.handleImage = this.handleImage.bind(this);
        this.handleKey = this.handleKey.bind(this)

    }
    
    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    addUser() {
        const formData = new FormData();
        formData.append('image',this.state.image);
        formData.append('name',this.state.name);
        formData.append('email',this.state.email);
        formData.append('password',this.state.password);
        formData.append('phone',this.state.phone);
        formData.append('address',this.state.address);
        formData.append('dateofbirth',this.state.dateofbirth);
        formData.append('question1',this.state.question1);
        formData.append('question2',this.state.question2);
        formData.append('question3',this.state.question3);

        let url = "http://localhost:3001/user/signup";
        let method = 'POST'

        fetch(url , {method : method , body: formData})
        .then(result => {
            
            if(result !==200 && result !==201){
                console.log('signup failed')
               this.setState({error:"This email is already registered!"})
            } 
            
            return result.json()
            
        })
       
        
    }
    handleImage(e){
        this.setState({image:e.target.files[0]
        , previewImg:URL.createObjectURL(e.target.files[0])
        })
    }
    handleKey(e){
        if(e.key === 'Enter'){
            e.preventDefault()
        this.addUser()
        console.log(this.state)
        }
    }
    onSubmit = (e) => {
        e.preventDefault()
        this.addUser()
        console.log(this.state)
    }
    render() {
        if(this.state.previewImg){
            var previewImage = <img src={this.state.previewImg} alt="preview"></img>
        }
        else {
             previewImage = null
        }
        if(this.state.error === ""){
            var error =  null
            }
            else {
              error= <p style={{backgroundColor:"#f8d7da" , color:"#721c24" , border:"1px solid #f5c6cb", padding:"6px",borderRadius:"4px"}}>{this.state.error} </p>
      
            }
        return (
            <div>
                <div> <Navbar/>  </div>
                <div className="Container">
                   
                    <div className="row1">
                        <div className="imagepreview">  {previewImage} </div>
                        {/* <div><button className="upload" type="button" onChange={this.handleChange}>Upload Image</button></div> */}
                        <input  type="file" name="image"  onChange={this.handleImage} required="required"></input>
                    </div>

                    <div className="form-page">
                        <form onSubmit={this.onSubmit} onKeyPress={this.handleKey}>
                            <div className="row2">
                                <label>Full Name</label>
                                <input className="input" name="name" autoComplete="off" type="text" onChange={this.handleChange} required />
                            </div>
                            
                            <div className="row2">
                                <label>Email</label>
                                <input className="input" name="email" autoComplete="off" type="Email" onChange={this.handleChange} required/>
                                {error}
                            </div>

                            <div className="row2">
                                <label>Password</label>
                                <input className="input" name="password" autoComplete="off" type="password" onChange={this.handleChange} required/>
                            </div>

                            <div className="row2">
                                <label>Phone Number</label>
                                <input className="input" name="phone" autoComplete="off" type="num" onChange={this.handleChange} required/>
                            </div>

                            <div className="row2">
                                <label>Address</label>
                                <input className="input" name="address" autoComplete="off" type="text" onChange={this.handleChange} required/>
                            </div>

                           

                            <div className="row2">
                                <label>Date of Birth</label>
                                <input className="input" name="dateofbirth" autoComplete="off" type="date"onChange={this.handleChange} required />
                            </div>

                            <div className="question">
                                 <div><label>Security Question</label></div>
                                    
                                 <div>
                                    <label >Q1. Last name of your close friend</label> 
                                    <br></br>
                                    <label >Q2. Your mother's phone number</label>
                                    <br></br>
                                    <label >Q3. Your favorite colour</label>
                                </div>
                               
                                 <div> 
                                     <input type="text" autoComplete="off" name="question1" className="inputquestion" onChange={this.handleChange} required/>
                                   
                                     <input type="text" autoComplete="off" name="question2" className="inputquestion" onChange={this.handleChange} required/>
                                     
                                     <input type="text" autoComplete="off" name="question3" className="inputquestion" onChange={this.handleChange} required/> 
                                </div>
                            </div>

                            <button type="submit" className="submit"  >Submit</button>
                        </form>

                    </div>



                </div>
                <div> <Footer/> </div>
            </div>
        )
    }
}
