import React, { Component } from 'react';

class Header extends React.Component {

    constructor(props){
        super(props);

        this.style = {
            backgroundColor: "#222",
            color: "#eee"
        };

        this.pStyle = {
            display: "flex",
            justifyContent: "flex-end"
        };
    }

    render(){
        return(
            <div style={this.style}>
                <h1 style={{"text-align": "center"}}>Astro Voting App</h1>
                <div>
                    <p style={this.pStyle}>
                        <span style={{"color": "#428bca"}}>Sign In </span>
                        <span>&nbsp;or&nbsp;</span> 
                        <span style={{"color": "#428bca"}}> Sign Up</span>
                    </p>
                </div>
            </div>
        );
    }

}

export default Header;