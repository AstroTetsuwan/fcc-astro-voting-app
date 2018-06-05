import React, { Component } from 'react';

import axios from 'axios';

class SignUp extends React.Component {
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

        this.state = {
            username: "",
            password: "",
            passwordConfirmation: "",
            message: ""
        }

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
        var {username, password, passwordConfirmation} = this.state;
        
        if(username === "" || password === "" || password !== passwordConfirmation){
            const state = this.state;
            state.message = "Registration failed, one field was empty or the password you entered did not match the confirmation.";
            this.setState(state);
        }

        else{
            axios.post('http://localhost:5000/api/auth/register', { username, password })
            .then((result) => {
                this.props.redirection();
            });
        }
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
                <div className="form-group">
                    <label>Password confirmation:</label>
                    <input type="password" 
                        className="form-control" 
                        placeholder="Enter password" 
                        id="password"
                        name="passwordConfirmation"                            
                        onChange={this.handleChange}/>
                </div>
                <div style={{display:"flex", justifyContent:"center"}}>
                    <button type="submit" style={{color: "#f7a440"}}
                    className="btn btn-default hover-orange-btn">Sign up</button>
                </div>
            </form>

            </div>
        );
    }
}

export default SignUp;