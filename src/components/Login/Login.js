import { Button, Paper, TextField, Typography } from "@material-ui/core";
import React,{Component} from "react";
import './Login.css';

class Login extends Component{
    constructor(){
        super();
        this.state = {
            users : [],
            email : "",
            errorMessage : ""
        }
        this.handleLogin = this.handleLogin.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.createUser = this.createUser.bind(this);
    }
    componentDidMount(){
        fetch('http://localhost:5000/users')
        .then(res =>res.json())
        .then(data =>{
            this.setState({users : data})
        }).catch(error => console.log(error))
    }
    handleChange(e){
        this.setState({[e.target.name] : e.target.value});
    }

    createUser(data) {
        fetch('http://localhost:5000/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email : data})
            
        }).then(res => {
            return res.json();
        }).catch(err => err);
    }

    handleLogin(){
        let role = "";
        if(!this.state.email){
            this.setState({errorMessage : "Enter Email ID"});
            return;
        }
        if(!this.state.email.match("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$")){
            this.setState({errorMessage : "Enter valid Email ID"});
            return;
        }
        this.setState({errorMessage : ""});
        this.setState({email : ""});
        const index = this.state.users.findIndex(user => user.email === this.state.email);
        if(index === -1){
            this.createUser(this.state.email);
        }
        else if(this.state.users[index].role === "owner"){
            role = "owner";
        }
        this.props.history.push({pathname :'/cityselector',search : `?role=${role}`});
    }
    render(){
        return(
            <div className = "mainContainer">
                <Paper className = "paperContainer" varient ='elevation' elevation={3} >
                    <Typography variant="h4" component="h2" >
                        Login
                    </Typography>
                    <TextField id="outlined-basic" label="Email ID" variant="outlined" name = "email" value = {this.state.email} onChange = {this.handleChange} className = "textfield"/>
                    {this.state.errorMessage && <div className = "errorMessage">{this.state.errorMessage}</div>}
                    <div className = "btnContainer">
                        <Button variant="contained" color="primary" className = "btn" onClick = {this.handleLogin}>
                            Login
                        </Button>
                    </div>
                    
                </Paper>
            </div>
        );
    }
}

export default Login;