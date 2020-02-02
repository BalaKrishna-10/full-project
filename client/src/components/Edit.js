import React, { Component } from 'react'
import "./Edit.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "./Mediaquery.css";

export default class Edit extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             name:"",
             email:"",
             phone:"",
             address:"",
             dateofbirth:"",
             image:"",
             user:[],
             update:"",
             error:"",
             changeImg:false,
             previewImg:"",
           
        }
        this.handleImage = this.handleImage.bind(this)
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
                image: resData.user.image,
                password: resData.user.password,
               
                // user:resData.user

            })
            console.log(this.state)
        })
    }
    handleChange = (e) =>{
        this.setState({
            [e.target.name] : e.target.value
        })
    }
    handleImage (e){
       
        this.setState({
            changeImg:true,
           image: e.target.files[0],
            previewImg:URL.createObjectURL(e.target.files[0])
        })
       
    }
  
    handleSubmit=(e)=>{
        e.preventDefault()
        const formData = new FormData();
        formData.append('image',this.state.image);
        formData.append('name',this.state.name);
        formData.append('email',this.state.email);
        formData.append('password',this.state.password);
        formData.append('phone',this.state.phone);
        formData.append('address',this.state.address);
        formData.append('dateofbirth',this.state.dateofbirth);
        
        const userId = localStorage.getItem('userId');
        let url = "http://localhost:3001/user/updateuser/" + userId;
        let method = 'PUT'

        fetch(url , {method : method , body: formData})
        .then(result => {
            if(result !==200 && result !==201){
                console.log('signup failed')
                this.setState({error:"Something went wrong.Please try again"})
            } 
            
            this.setState({update:"Information Successfully updated!"})
            localStorage.setItem('name',this.state.name)
            return result.json()
        })
        .catch(err => {
            console.log(err)
        })
    }
    render() {
        if(this.state.changeImg){
            var changeImg = this.state.previewImg
        }
        else{
             changeImg = 'http://localhost:3001/'+this.state.image
        }
        if(this.state.update === ""){
            var updateMsg =  null
            }
            else {
              updateMsg= <p style={{backgroundColor:"#d4edda" , color:"#155724" , border:"1px solid #c3e6cb", padding:"6px",borderRadius:"4px"}}>{this.state.update} </p>
      
            }
           
        return (
                <div>
                     <div className="profile"> 
            <header>
             <Navbar />
             </header>
                   {updateMsg}
                 <div className="main">
                     <h3 className="heading">Edit Your Profile</h3>
                     <div className="form-grid-view">
                     
                      <div>
                     <form className="form-line" autoComplete="off" onSubmit={this.handleSubmit}>
                   
                        <div>
                            <label>Name</label> </div>

                           <div>
                                <input name="name" value={this.state.name}  onChange={this.handleChange}/>
                           </div>
                        
                           <div>
                            <label>Email</label>
                           
                        </div> 

                        <div>
                             <input type="email" name="email" value={this.state.email} onChange={this.handleChange} />
                        </div>
                        
                        <div>
                            <label>Password</label>
                           
                        </div> 

                        <div>
                             <input type="text" name="password"  onChange={this.handleChange} required />
                        </div>
                        <p style={{color:"red"}}>*Must enter your old password if you don't want to update it.</p>
                        <div>
                            <label>Phone</label>
                       </div>

                       <div>
                           <input type="int" name="phone" value={this.state.phone} onChange={this.handleChange} />
                        </div>

                        <div>
                            <label>Address</label>
                           
                        </div>

                         <div> 
                             <input type="address" name="address" value={this.state.address} onChange={this.handleChange}/>
                        </div>

                        

                        <div>
                            <label>Date of Birth</label>
                            
                        </div> 
                        
                        <div>
                            <input type="date" name="dateofbirth" value={this.state.dateofbirth} onChange={this.handleChange}/>
                        </div>
                        <input type="file" onChange={this.handleImage} ></input>
                        <div>
                            <button type="submit" className="sub" >Update</button>
                        </div>

                        
                   


                     </form>
                     
                     </div>
                     <div className="image"> 
                        <img src={changeImg} alt="preview image"></img>
                       
                     </div>
                     </div>
                      
                     
            </div>

           </div>
           <Footer />
            </div>

           
            
        )
    }
}
