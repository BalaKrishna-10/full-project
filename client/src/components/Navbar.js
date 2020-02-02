import React, { Component } from 'react'
import "./Navbar.css";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default class Navbar extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             open : false,
             email:"",
             password:"",
             userName:"",
             userId:"",
            token:"",
            isAuth:"",
            error:""
        }
        this.logOut = this.logOut.bind(this)
    }

    onLogin(){
        fetch('http://localhost:3001/user/signin' ,
         {method:'POST' , headers:{'Content-Type':'application/json'},
        body:JSON.stringify({
            email:this.state.email,
            password:this.state.password
            
        })
    })
    .then(result => {
        if(result.status === 422){
            throw new Error('Validation Error');
          }
        if(result.status !==200 && result.status!==201){
            console.log('SignIn failed')
            this.setState({error:"Incorrect email or password!"})
            throw new Error('Could not authenticate you!');
        }
        return result.json()
    })
    .then(resData => {
        console.log(resData);
        this.setState({
          isAuth:true,
          token:resData.token,
          userId:resData.userId,
          userName:resData.userName,
            open: false 
            
        });
        localStorage.setItem('token',this.state.token)
        localStorage.setItem('name',this.state.userName)
        localStorage.setItem('userId',this.state.userId)
        window.location.href="/profile"
    })
    .catch(err => {
        console.log(err);
        this.setState({
          isAuth: false,
        })
      })
    }
    handleChange=(e) => {
        this.setState({
            [e.target.name] : e.target.value

        })
    }
    handleClickOpen = () => {
        this.setState({ open: true });
      };
    
      handleClose = (e) => {
        this.setState({ open: false });
         
      };
      handleLogin=(e) => {
        e.preventDefault()
        console.log(this.state)
        this.onLogin()
       
      }
      
      logOut () {
        this.setState({
          token:"",
          userName:"",
          userId:"",
          isAuth:""
        })
        localStorage.removeItem('token')
        localStorage.removeItem('name')
        localStorage.removeItem('userId')
        window.location.href="/"
      }
    render() {
      if(localStorage.getItem('token')){
        var name = <p  style={{color:"white",letterSpacing:"1px",marginRight:"10px"}}>{localStorage.getItem('name')}</p>
        var logout =  <a onClick={this.logOut} style={{cursor:"pointer"}}>Logout</a>
        var profile =  <a href="/profile">Profile</a>
        var edit = <a href="/edit">Edit</a>
       
      }
      else {
         name = <a onClick={this.handleClickOpen} style={{cursor:"pointer"}}>SignIn</a>
        var signup = <a href="/signUp">SignUp</a>
         profile =  null
          
      }
      if(this.state.error === ""){
      var error =  null
      }
      else {
       var error= <p style={{backgroundColor:"#f8d7da" , color:"#721c24" , border:"1px solid #f5c6cb", padding:"6px",borderRadius:"4px"}}>{this.state.error} </p>

      }
        return (
            <div>
            <nav className="nav">
                <div className="Logo">
                    <h4><a href="/">Home</a></h4>
                </div>
                    <ul id="links">
                    <li> {name}</li>
                    <li className="fas fa-user-plus"> {profile}</li>
                    <li className="fas fa-user-plus"> {edit}</li>
                    <li className="fas fa-user-plus">  {signup}</li>
                    <li className="fas fa-user-plus">  {logout}</li>

                   

                    </ul>
            </nav>
            <div>
              <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Log In</DialogTitle>
          {error}
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Email Address"
              type="email"
              fullWidth
              name="email"
              onChange={this.handleChange}
            />
            <TextField
              margin="dense"
              id="pass"
              label="Password"
              type="password"
              fullWidth
              name="password"
              onChange={this.handleChange}
            />
            <DialogContentText style={{textAlign:"center"}}>OR
              <br></br>  <a href="/signUp">Click here to Signup</a>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleLogin} color="primary">
              LogIn
            </Button>
          </DialogActions>
        </Dialog>
      </div>
            </div>
            
        )
    }
}
