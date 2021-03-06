import React, { Component } from 'react';

import { Redirect } from 'react-router-dom';

import axios from 'axios';

class SignIn extends React.Component {
    constructor(props){
        super(props);

        this.style = {
            minWidth: "100%",
            minHeight: "90vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexFlow: "column nowrap"
        };

        this.formStyle = {
            borderRadius: "10px",
            border: "1px solid #ccc",
            padding: "5px",
            backgroundColor: "#222",
            color: "#f7a440"
        };
        
        this.state = {username: "", password: "", message: ""};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e){
        const state = this.state;
        state[e.target.name] = e.target.value;
        this.setState(state);
    }    

    handleSubmit(e){
        e.preventDefault();

        const { username, password } = this.state;

        axios.post('http://localhost:5000/api/auth/login', { username, password })
        .then((result) => {
            localStorage.setItem('jwtToken', result.data.token);
            this.setState({ message: ''});
            this.props.redirection(result.data.user);
        })
        .catch((error) => {
            if(error.response.status === 401) {
            this.setState({ message: 'Login failed. Username or password not match' });
            }
        });
    }

    render(){
        return(
            <div style={this.style}>
                

                {this.state.message !== "" &&
                    <div className="alert alert-warning alert-dismissible" role="alert">
                        { this.state.message }
                    </div>    
                }
                <form onSubmit={this.handleSubmit} style={this.formStyle}>
                

                    <div className="form-group">
                        <label>Username:</label>
                        <input type="text" 
                            className="form-control" 
                            placeholder="Enter username" 
                            id="username"
                            name="username"
                            onChange={this.handleChange}
                            autoFocus/>
                    </div>
                    <div className="form-group">
                        <label>Password:</label>
                        <input type="password" 
                            className="form-control" 
                            placeholder="Enter password" 
                            id="password"
                            name="password"                            
                            onChange={this.handleChange}/>
                    </div>
                    <div style={{display:"flex", justifyContent:"center"}}>
                        <button type="submit" style={{color:"#f7a440", backgroundColor:"#EEE"}} 
                        className="btn btn-default hover-orange-btn">Sign in</button>
                    </div>
                </form>
                <p style={{textAlign: "center", margin: "10px", 
                            fontSize:"1.5em", color:"#f7a440",}}>OR</p>
                <div>
                    <button type="button" 
                        className="btn btn-default hover-orange-btn" 
                        style={{display:"flex", alignItems: "center",
                                color:"#f7a440", backgroundColor:"#222"}}>
                        Sign in with Github 
                        <i className="fab fa-github fa-2x" style={{marginLeft: "5px"}}></i>
                    </button>
                </div>
            </div>
        );
    }

}

export default SignIn;